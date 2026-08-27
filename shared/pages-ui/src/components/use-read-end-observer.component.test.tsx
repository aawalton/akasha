import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { useReadEndObserver } from "./use-read-end-observer"

type MinimalEntry = { isIntersecting: boolean }
type MinimalObserverCallback = (entries: readonly MinimalEntry[]) => void

let captured: MinimalObserverCallback | null = null
let observedCount = 0

function StubObserver(cb: MinimalObserverCallback) {
  captured = cb
  return {
    observe() {
      observedCount += 1
    },
    unobserve() {},
    disconnect() {},
    takeRecords: () => [],
    root: null,
    rootMargin: "",
    thresholds: [],
  }
}

function installStub() {
  captured = null
  observedCount = 0
  Object.defineProperty(globalThis, "IntersectionObserver", {
    value: StubObserver,
    configurable: true,
    writable: true,
  })
}

function Harness(props: { enabled: boolean; onReadToEnd?: () => void }) {
  const ref = useReadEndObserver({
    enabled: props.enabled,
    onReadToEnd: props.onReadToEnd,
    resetKey: "chapter-1",
  })
  return <div ref={ref} data-testid="sentinel" />
}

const STABLE_ON_READ_TO_END = () => {
  lateFired += 1
}
let lateFired = 0

function LateHarness(props: { show: boolean }) {
  const ref = useReadEndObserver({
    enabled: true,
    onReadToEnd: STABLE_ON_READ_TO_END,
    resetKey: "chapter-1",
  })
  return props.show ? <div ref={ref} data-testid="sentinel" /> : null
}

beforeEach(() => {
  installStub()
})
afterEach(() => {
  cleanup()
})

describe("useReadEndObserver — auto-mark-read seam", () => {
  it("fires onReadToEnd once when the sentinel intersects and the seam is enabled", () => {
    let fired = 0
    render(
      <Harness
        enabled
        onReadToEnd={() => {
          fired += 1
        }}
      />
    )
    captured?.([{ isIntersecting: true }])
    expect(fired).toBe(1)
    captured?.([{ isIntersecting: true }])
    expect(fired).toBe(1)
  })

  it("attaches the observer when the sentinel mounts AFTER first render (loading→loaded)", () => {
    lateFired = 0
    const { rerender } = render(<LateHarness show={false} />)
    expect(observedCount).toBe(0)
    expect(captured).toBeNull()
    rerender(<LateHarness show />)
    expect(observedCount).toBe(1)
    captured?.([{ isIntersecting: true }])
    expect(lateFired).toBe(1)
  })

  it("does not fire before the sentinel intersects", () => {
    let fired = 0
    render(
      <Harness
        enabled
        onReadToEnd={() => {
          fired += 1
        }}
      />
    )
    captured?.([{ isIntersecting: false }])
    expect(fired).toBe(0)
  })

  it("does not arm the observer when the seam is disabled", () => {
    render(<Harness enabled={false} onReadToEnd={() => {}} />)
    expect(observedCount).toBe(0)
    expect(captured).toBeNull()
  })

  it("does not arm the observer when no callback is supplied", () => {
    render(<Harness enabled />)
    expect(captured).toBeNull()
  })
})
