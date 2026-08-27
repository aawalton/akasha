import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { RefObject } from "react"
import type { ReaderPositionAnchor } from "./reader-prose-body"
import { useReadEndOnScroll } from "./use-read-end-on-scroll"

let origRaf: typeof globalThis.requestAnimationFrame
let origCancel: typeof globalThis.cancelAnimationFrame

function stubMetrics(scrollHeight: number, clientHeight: number, scrollTop: number) {
  Object.defineProperty(document.documentElement, "scrollHeight", {
    value: scrollHeight,
    configurable: true,
  })
  Object.defineProperty(document.documentElement, "clientHeight", {
    value: clientHeight,
    configurable: true,
  })
  Object.defineProperty(document.documentElement, "scrollTop", {
    value: scrollTop,
    configurable: true,
  })
}

function setScrollTop(scrollTop: number) {
  Object.defineProperty(document.documentElement, "scrollTop", {
    value: scrollTop,
    configurable: true,
  })
}

function anchorRefOf(state: { fraction: number }): RefObject<ReaderPositionAnchor | null> {
  return {
    current: { fractionAt: () => state.fraction, scrollTopFor: () => 0, scrollToBlock: () => {} },
  }
}

function nullAnchorRef(): RefObject<ReaderPositionAnchor | null> {
  return { current: null }
}

function Harness(props: {
  enabled: boolean
  onReadToEnd?: () => void
  resetKey: string
  anchorRef: RefObject<ReaderPositionAnchor | null>
}) {
  useReadEndOnScroll({
    enabled: props.enabled,
    onReadToEnd: props.onReadToEnd,
    resetKey: props.resetKey,
    anchorRef: props.anchorRef,
  })
  return null
}

beforeEach(() => {
  origRaf = globalThis.requestAnimationFrame
  origCancel = globalThis.cancelAnimationFrame
  const syncRaf: typeof globalThis.requestAnimationFrame = (cb) => {
    cb(0)
    return 0
  }
  const noopCancel: typeof globalThis.cancelAnimationFrame = () => {}
  globalThis.requestAnimationFrame = syncRaf
  globalThis.cancelAnimationFrame = noopCancel
  stubMetrics(100000, 720, 0)
})
afterEach(() => {
  cleanup()
  globalThis.requestAnimationFrame = origRaf
  globalThis.cancelAnimationFrame = origCancel
})

describe("useReadEndOnScroll — auto-mark-read trigger", () => {
  it("fires once when the content fraction crosses the read threshold on scroll", () => {
    let fired = 0
    const state = { fraction: 0.4 }
    render(
      <Harness
        enabled
        resetKey="c1"
        anchorRef={anchorRefOf(state)}
        onReadToEnd={() => (fired += 1)}
      />
    )
    expect(fired).toBe(0)
    state.fraction = 0.985
    setScrollTop(98000)
    window.dispatchEvent(new Event("scroll"))
    expect(fired).toBe(1)
    state.fraction = 1
    setScrollTop(99280)
    window.dispatchEvent(new Event("scroll"))
    expect(fired).toBe(1)
  })

  it("does not fire before the content fraction reaches the threshold", () => {
    let fired = 0
    const state = { fraction: 0.5 }
    render(
      <Harness
        enabled
        resetKey="c1"
        anchorRef={anchorRefOf(state)}
        onReadToEnd={() => (fired += 1)}
      />
    )
    state.fraction = 0.97
    window.dispatchEvent(new Event("scroll"))
    expect(fired).toBe(0)
  })

  it("re-arms for a new page when resetKey changes", () => {
    let fired = 0
    const state = { fraction: 0.99 }
    const { rerender } = render(
      <Harness
        enabled
        resetKey="c1"
        anchorRef={anchorRefOf(state)}
        onReadToEnd={() => (fired += 1)}
      />
    )
    expect(fired).toBe(1)
    rerender(
      <Harness
        enabled
        resetKey="c2"
        anchorRef={anchorRefOf(state)}
        onReadToEnd={() => (fired += 1)}
      />
    )
    expect(fired).toBe(2)
  })

  it("fires on mount for a short body that fits the viewport (no anchor, no scroll room)", () => {
    let fired = 0
    stubMetrics(600, 720, 0)
    render(
      <Harness enabled resetKey="c1" anchorRef={nullAnchorRef()} onReadToEnd={() => (fired += 1)} />
    )
    expect(fired).toBe(1)
  })

  it("does not fire on mount for a long NON-virtualized body still at the top", () => {
    let fired = 0
    stubMetrics(5000, 720, 0)
    render(
      <Harness enabled resetKey="c1" anchorRef={nullAnchorRef()} onReadToEnd={() => (fired += 1)} />
    )
    expect(fired).toBe(0)
  })

  it("is inert when disabled", () => {
    let fired = 0
    const state = { fraction: 1 }
    render(
      <Harness
        enabled={false}
        resetKey="c1"
        anchorRef={anchorRefOf(state)}
        onReadToEnd={() => (fired += 1)}
      />
    )
    window.dispatchEvent(new Event("scroll"))
    expect(fired).toBe(0)
  })

  it("does not fire during the skeleton phase even though the short skeleton fits the viewport", () => {
    let fired = 0
    stubMetrics(600, 720, 0)
    render(
      <Harness
        enabled={false}
        resetKey="c1"
        anchorRef={nullAnchorRef()}
        onReadToEnd={() => (fired += 1)}
      />
    )
    expect(fired).toBe(0)
  })

  it("is inert when no callback is supplied", () => {
    const state = { fraction: 1 }
    render(<Harness enabled resetKey="c1" anchorRef={anchorRefOf(state)} />)
    window.dispatchEvent(new Event("scroll"))
    expect(true).toBe(true)
  })
})
