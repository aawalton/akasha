import { afterEach, describe, expect, it, mock } from "bun:test"
import { cleanup, renderHook } from "@shared/utils-test"
import { waitFor } from "@testing-library/react"

let acquireCalls: string[] = []
let releaseCalls: string[] = []
let readyBehavior: (slug: string) => Promise<void> = async () => undefined

const fakeStore = {
  acquireSlug: (slug: string) => {
    acquireCalls.push(slug)
  },
  releaseSlug: (slug: string) => {
    releaseCalls.push(slug)
  },
  isSlugReady: () => false,
  whenSlugReady: (slug: string) => readyBehavior(slug),
  setAuth: () => undefined,
}

const realSupabaseRr = await import("@shared/supabase-rr")
const realGetBrowserClient = realSupabaseRr.getBrowserClient
const realCreateBrowserClient = realSupabaseRr.createBrowserClient

const realPagesStore = await import("@shared/pages-ui-store")

await mock.module("@shared/pages-ui-store", () => ({
  FILE_BACKING_POLL_MS: realPagesStore.FILE_BACKING_POLL_MS,
  configurePagesStoreFetch: realPagesStore.configurePagesStoreFetch,
  getPagesStore: async () => fakeStore,
  awaitPagesStoreReady: async () => fakeStore,
  configurePagesStoreAuth: async () => undefined,
  configurePagesPersistence: () => undefined,
  configureContentPersistence: realPagesStore.configureContentPersistence,
  getContentPersistence: realPagesStore.getContentPersistence,
  createRegularPipeline: () => ({}),
  createIdSuffixPipeline: () => ({}),
  createViewPipeline: () => ({}),
  deriveViewTargetSlugs: realPagesStore.deriveViewTargetSlugs,
  runPagesOptimisticMutation: async () => undefined,
  setStoreDiagnosticsSink: realPagesStore.setStoreDiagnosticsSink,
  emitStoreDiagnostic: realPagesStore.emitStoreDiagnostic,
  reportPagesStoreStall: async () => undefined,
  PageRowSchema: realPagesStore.PageRowSchema,
  ShapeResumeStateSchema: realPagesStore.ShapeResumeStateSchema,
}))

const stableClient = {}
await mock.module("@shared/supabase-rr", () => ({
  useSupabase: () => stableClient,
  SupabaseProvider: ({ children }: { children: unknown }) => children,
  createBrowserClient: realCreateBrowserClient,
  getBrowserClient: realGetBrowserClient,
  signInWithPassword: async () => undefined,
  signOut: async () => undefined,
  signUpWithPassword: async () => undefined,
}))

const { setStoreDiagnosticsSink } = await import("@shared/pages-ui-store")
const { BOOT_GATE_TIMEOUT_MS } = await import("./boot-gate")
const { useCoreDefinitionsReady } = await import("./use-core-definitions-ready")

afterEach(() => {
  cleanup()
  acquireCalls = []
  releaseCalls = []
  readyBehavior = async () => undefined
  setStoreDiagnosticsSink(null)
})

describe("useCoreDefinitionsReady", () => {
  it("acquires both core-definition slugs and reports ready once they are resident", async () => {
    const { result } = renderHook(() => useCoreDefinitionsReady())

    await waitFor(() => {
      expect(result.current).toBe(true)
    })
    expect(acquireCalls).toContain("page-type")
    expect(acquireCalls).toContain("page-property-definition")
  })

  it("reports false until both slugs' snapshots reach up-to-date", async () => {
    let resolveReady: (() => void) | undefined
    const gate = new Promise<void>((resolve) => {
      resolveReady = resolve
    })
    readyBehavior = async () => {
      await gate
    }

    const { result } = renderHook(() => useCoreDefinitionsReady())

    await waitFor(() => {
      expect(acquireCalls.length).toBe(2)
    })
    expect(result.current).toBe(false)

    resolveReady?.()
    await waitFor(() => {
      expect(result.current).toBe(true)
    })
  })

  it("unblocks (ready) even when a slug's stream fails — never wedges the view", async () => {
    readyBehavior = async () => {
      throw new Error("stream failed")
    }

    const { result } = renderHook(() => useCoreDefinitionsReady())

    await waitFor(() => {
      expect(result.current).toBe(true)
    })
  })

  it("gives up at a ceiling when a slug never reaches up-to-date, per Bounded Wait", async () => {
    const reasons: string[] = []
    setStoreDiagnosticsSink((d) => {
      reasons.push(d.reason)
    })
    readyBehavior = () => new Promise<void>(() => undefined)

    const { result } = renderHook(() => useCoreDefinitionsReady())

    await waitFor(() => {
      expect(acquireCalls.length).toBe(2)
    })
    expect(result.current).toBe(false)

    await waitFor(
      () => {
        expect(result.current).toBe(true)
      },
      { timeout: BOOT_GATE_TIMEOUT_MS * 2 }
    )
    expect(reasons).toContain("boot-gate-timeout")
  })
})
