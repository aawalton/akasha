import { afterEach, describe, expect, it } from "bun:test"
import { type StoreDiagnostic, setStoreDiagnosticsSink } from "../diagnostics"
import { createPagesStore } from "./store"

const TOKEN = "opaque-session-token"

afterEach(() => {
  setStoreDiagnosticsSink(null)
})

function collecting(): readonly StoreDiagnostic[] {
  const seen: StoreDiagnostic[] = []
  setStoreDiagnosticsSink((d) => {
    seen.push(d)
  })
  return seen
}

async function until(pred: () => boolean, label: string): Promise<void> {
  for (let i = 0; i < 400; i += 1) {
    if (pred()) return
    await new Promise((resolve) => setTimeout(resolve, 5))
  }
  throw new Error(`timed out waiting for ${label}`)
}

const emptyAnswer = (): Promise<Response> =>
  Promise.resolve(
    new Response(JSON.stringify({ rows: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  )

describe("a definition-tier shape that goes live carrying nothing", () => {
  it("says so on the diagnostics channel, naming the shape", async () => {
    const seen = collecting()
    const store = createPagesStore(null, 250, undefined, {
      roster: () => Promise.resolve(new Set<string>(["page-type"])),
      fetchImpl: emptyAnswer,
    })
    store.setAuth({ jwt: TOKEN })
    store.acquireSlug("page-type")
    await store.whenSlugReady("page-type")

    const reported = seen.filter((d) => d.reason === "definition-tier-empty")
    expect(reported).toHaveLength(1)
    expect(reported[0]?.message).toContain("page-type went live carrying no pages")
    expect(reported[0]?.detail).toBe("shape=page-type rows=0 roster=read")
  })

  it("names page-property-definition too, not only page-type", async () => {
    const seen = collecting()
    const store = createPagesStore(null, 250, undefined, {
      roster: () => Promise.resolve(new Set<string>(["page-property-definition"])),
      fetchImpl: emptyAnswer,
    })
    store.setAuth({ jwt: TOKEN })
    store.acquireSlug("page-property-definition")
    await store.whenSlugReady("page-property-definition")

    const reported = seen.filter((d) => d.reason === "definition-tier-empty")
    expect(reported).toHaveLength(1)
    expect(reported[0]?.detail).toBe("shape=page-property-definition rows=0 roster=read")
  })

  it("still lets readiness resolve, so boot is not wedged behind rows that are gone", async () => {
    collecting()
    const store = createPagesStore(null, 250, undefined, {
      roster: () => Promise.resolve(new Set<string>()),
      fetchImpl: emptyAnswer,
    })
    store.setAuth({ jwt: TOKEN })
    store.acquireSlug("page-property-definition")
    await store.whenSlugReady("page-property-definition")
    expect(store.isSlugReady("page-property-definition")).toBe(true)
  })

  it("reports each definition-tier shape once, not once per poll", async () => {
    const seen = collecting()
    const store = createPagesStore(null, 250, undefined, {
      roster: () => Promise.resolve(new Set<string>()),
      fetchImpl: emptyAnswer,
      pollMs: 5,
    })
    store.setAuth({ jwt: TOKEN })
    store.acquireSlug("page-type")
    await store.whenSlugReady("page-type")
    await new Promise((resolve) => setTimeout(resolve, 60))
    expect(seen.filter((d) => d.reason === "definition-tier-empty")).toHaveLength(1)
  })
})

describe("an ordinary page type that goes live carrying nothing", () => {
  it("says nothing, because an empty ordinary type is a legitimate state", async () => {
    const seen = collecting()
    const asked: string[] = []
    const store = createPagesStore(null, 250, undefined, {
      roster: () => Promise.resolve(new Set<string>(["task"])),
      fetchImpl: (input: string) => {
        asked.push(input)
        return emptyAnswer()
      },
    })
    store.setAuth({ jwt: TOKEN })
    store.acquireSlug("task")
    await until(() => asked.length > 0, "the file-backed reader to be asked for task")

    expect(seen.filter((d) => d.reason === "definition-tier-empty")).toHaveLength(0)
  })
})
