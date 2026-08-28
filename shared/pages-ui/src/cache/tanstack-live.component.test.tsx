import { afterEach, describe, expect, it, mock, spyOn } from "bun:test"
import { cleanup, renderHook } from "@shared/utils-test"
import { setStoreDiagnosticsSink } from "@shared/pages-ui-store/diagnostics"
import { waitFor } from "@testing-library/react"

let whenSlugReadyImpl: () => Promise<undefined> = async () => undefined

const fakeStore = {
  collection: {},
  acquireSlug: () => undefined,
  releaseSlug: () => undefined,
  isSlugReady: () => false,
  whenSlugReady: () => whenSlugReadyImpl(),
  setAuth: () => undefined,
}

await mock.module("@shared/pages-ui-store/singleton", () => ({
  getPagesStore: async () => fakeStore,
  awaitPagesStoreReady: async () => fakeStore,
}))

const { useAcquireSlug, usePipelineLive } = await import("./tanstack-live")

afterEach(() => {
  cleanup()
  whenSlugReadyImpl = async () => undefined
})

describe("usePipelineLive read()-throw surfacing (#15044)", () => {
  it("surfaces a read() throw as error (snapshot null), not a silent forever-null", async () => {
    const thrown = new Error("pipeline read boom")
    const errorSpy = spyOn(console, "error").mockImplementation(() => undefined)
    try {
      const makePipeline = () => ({
        read: () => {
          throw thrown
        },
        subscribe: () => () => undefined,
        dispose: () => undefined,
      })

      const { result } = renderHook(() => usePipelineLive(makePipeline, "k", true))

      await waitFor(() => {
        expect(result.current.error).toBe(thrown)
      })
      expect(result.current.snapshot).toBeNull()
      expect(errorSpy).toHaveBeenCalled()
    } finally {
      errorSpy.mockRestore()
    }
  })

  it("durably reports a read() throw to the diagnostics sink (view-read-throw)", async () => {
    const thrown = new Error("pipeline read boom — durable")
    const errorSpy = spyOn(console, "error").mockImplementation(() => undefined)
    const sink = mock((_d: { reason: string; message: string; detail: string }) => undefined)
    setStoreDiagnosticsSink(sink)
    try {
      const makePipeline = () => ({
        read: () => {
          throw thrown
        },
        subscribe: () => () => undefined,
        dispose: () => undefined,
      })

      const { result } = renderHook(() => usePipelineLive(makePipeline, "kd", true))

      await waitFor(() => {
        expect(result.current.error).toBe(thrown)
      })
      await waitFor(() => {
        expect(sink).toHaveBeenCalledTimes(1)
      })
      const diagnostic = sink.mock.calls[0]?.[0]
      expect(diagnostic?.reason).toBe("view-read-throw")
      expect(diagnostic?.detail).toContain("pipeline read boom — durable")
    } finally {
      setStoreDiagnosticsSink(null)
      errorSpy.mockRestore()
    }
  })

  it("a non-Error throw is coerced to an Error and surfaced", async () => {
    const errorSpy = spyOn(console, "error").mockImplementation(() => undefined)
    try {
      const makePipeline = () => ({
        read: (): unknown => {
          throw "string failure"
        },
        subscribe: () => () => undefined,
        dispose: () => undefined,
      })

      const { result } = renderHook(() => usePipelineLive(makePipeline, "k2", true))

      await waitFor(() => {
        expect(result.current.error).toBeInstanceOf(Error)
      })
      expect(result.current.error?.message).toBe("string failure")
      expect(result.current.snapshot).toBeNull()
    } finally {
      errorSpy.mockRestore()
    }
  })

  it("a healthy read() yields the snapshot with error null", async () => {
    const snapshot = { rows: [], totalCount: 0 }
    const makePipeline = () => ({
      read: () => snapshot,
      subscribe: () => () => undefined,
      dispose: () => undefined,
    })

    const { result } = renderHook(() => usePipelineLive(makePipeline, "k3", true))

    await waitFor(() => {
      expect(result.current.snapshot).toBe(snapshot)
    })
    expect(result.current.error).toBeNull()
  })

  it("not-enabled stays at the empty result (null snapshot, null error)", () => {
    const makePipeline = () => ({
      read: () => ({ rows: [] }),
      subscribe: () => () => undefined,
      dispose: () => undefined,
    })

    const { result } = renderHook(() => usePipelineLive(makePipeline, "k4", false))

    expect(result.current.snapshot).toBeNull()
    expect(result.current.error).toBeNull()
  })
})

describe("useAcquireSlug degrade-granted readiness (#16113)", () => {
  it("a stalled fold reaches ready via the degrade and says so", async () => {
    let releaseFold: (() => void) | undefined
    whenSlugReadyImpl = () =>
      new Promise<undefined>((resolve) => {
        releaseFold = () => resolve(undefined)
      })
    const sink = mock((_d: { reason: string; message: string; detail: string }) => undefined)
    setStoreDiagnosticsSink(sink)
    try {
      const { result } = renderHook(() => useAcquireSlug("temper-account-character"))

      expect(result.current.ready).toBe(false)
      expect(result.current.degraded).toBe(false)

      await waitFor(() => expect(result.current.ready).toBe(true), { timeout: 8000 })
      expect(result.current.degraded).toBe(true)
      expect(sink.mock.calls[0]?.[0]?.reason).toBe("boot-gate-timeout")

      releaseFold?.()
      await waitFor(() => expect(result.current.degraded).toBe(false), { timeout: 8000 })
      expect(result.current.ready).toBe(true)
    } finally {
      setStoreDiagnosticsSink(null)
      releaseFold?.()
    }
  })

  it("a fold that lands reaches ready WITHOUT the degrade flag", async () => {
    const { result } = renderHook(() => useAcquireSlug("temper-account-character"))

    await waitFor(() => expect(result.current.ready).toBe(true))
    expect(result.current.degraded).toBe(false)
  })
})
