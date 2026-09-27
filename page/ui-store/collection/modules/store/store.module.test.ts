import { afterEach, expect, setSystemTime, test } from "bun:test"
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

test("a reader is told only the page types its roster names, and the types it leaves out are never read or reported", async () => {
  const { store, unbacked, fetched, reads } = storeOver([["feature-request", "page-type"]])
  const named = await store.rosterNamed(["domain", "feature-request", "contributor"])

  expect(named).toEqual(["feature-request"])
  expect(reads()).toBe(2)
  expect(unbacked).toEqual([])
  expect(fetched).toEqual([])
})

test("a page type landed after the roster was read is told as named once the roster is read again", async () => {
  const { store, reads } = storeOver([["page-type"], ["page-type", "model-version"]])
  expect(await store.rosterNamed(["page-type"])).toEqual(["page-type"])
  expect(await store.rosterNamed(["model-version"])).toEqual(["model-version"])
  expect(await store.rosterNamed(["model-version", "domain"])).toEqual(["model-version"])
  expect(await store.rosterNamed(["domain"])).toEqual([])

  expect(reads()).toBe(3)
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

const MODEL_VERSION_READ = "/api/pages/model-version"

const NOTHING_HELD = { rows: [], held: 0, cut: false }

test("an answer a page carried is taken in place of its read once, and the next read asks", async () => {
  const { store, fetched } = storeOver([["page-type", "model-version"]])
  store.seed({ [MODEL_VERSION_READ]: NOTHING_HELD })
  store.acquireSlug("model-version")
  await settled()

  expect(fetched).toEqual([])
  expect(store.isSlugReady("model-version")).toBe(true)
  await store.readSlugAgain("model-version")
  expect(fetched).toEqual([MODEL_VERSION_READ])
  store.releaseSlug("model-version")
})

test("an answer carried more than thirty seconds before its read is not taken", async () => {
  const { store, fetched } = storeOver([["page-type", "model-version"]])
  setSystemTime(new Date("2026-01-01T00:00:00Z"))
  store.seed({ [MODEL_VERSION_READ]: NOTHING_HELD })
  setSystemTime(new Date("2026-01-01T00:00:31Z"))
  store.acquireSlug("model-version")
  await settled()
  setSystemTime()

  expect(fetched).toEqual([MODEL_VERSION_READ])
  store.releaseSlug("model-version")
})

test("a shape attached again within thirty seconds takes the answer carried again rather than asking", async () => {
  const { store, fetched } = storeOver([["page-type", "model-version"]])
  store.seed({ [MODEL_VERSION_READ]: NOTHING_HELD })
  store.acquireSlug("model-version")
  await settled()
  store.releaseSlug("model-version")
  store.acquireSlug("model-version")
  await settled()

  expect(fetched).toEqual([])
  store.releaseSlug("model-version")
})
