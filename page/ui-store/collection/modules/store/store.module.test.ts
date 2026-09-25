import { afterEach, expect, test } from "bun:test"
import { createPagesStore } from "akasha/page/ui-store/collection/modules/store/store.module.code.ts"
import { setStoreDiagnosticsSink } from "akasha/page/ui-store/modules/diagnostics/diagnostics.module.code.ts"

const settled = (): Promise<void> => new Promise((done) => setTimeout(done, 0))

function storeOver(rosters: readonly (readonly string[])[]) {
  const unbacked: string[] = []
  const fetched: string[] = []
  let read = 0
  setStoreDiagnosticsSink((diagnostic) => {
    if (diagnostic.reason === "page-type-unbacked") unbacked.push(diagnostic.detail)
    return undefined
  })
  const store = createPagesStore({
    roster: async () => {
      const answer = rosters[Math.min(read, rosters.length - 1)] ?? []
      read += 1
      return new Set(answer)
    },
    fetchImpl: async (input) => {
      fetched.push(input)
      return Response.json({ rows: [] })
    },
  })
  store.setAuth({ jwt: null, owner: "alan" })
  return { store, unbacked, fetched, reads: () => read }
}

afterEach(() => {
  setStoreDiagnosticsSink(null)
})

test("a page type landed after the roster was read sends the roster to be read again, and its pages are read", async () => {
  const { store, unbacked, fetched, reads } = storeOver([
    ["page-type"],
    ["page-type", "model-version"],
  ])
  store.acquireSlug("page-type")
  await settled()
  store.acquireSlug("model-version")
  await settled()

  expect(reads()).toBe(2)
  expect(unbacked).toEqual([])
  expect(fetched).toContain("/api/pages/model-version")
  store.releaseSlug("model-version")
  store.releaseSlug("page-type")
})

test("a page type the roster read again still names nowhere is reported once, and the roster is not read a third time for it", async () => {
  const { store, unbacked, reads } = storeOver([["page-type"]])
  store.acquireSlug("page-type")
  await settled()
  store.acquireSlug("option-list")
  await settled()
  store.releaseSlug("option-list")
  store.acquireSlug("option-list")
  await settled()

  expect(reads()).toBe(2)
  expect(unbacked).toEqual(["shape=option-list roster=read"])
  store.releaseSlug("option-list")
  store.releaseSlug("page-type")
})
