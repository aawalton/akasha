import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { act, cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { type RefObject, useRef } from "react"
import { SETTLE_QUIET_MS, useRestoreReadPosition } from "./use-restore-read-position"

let scrollCalls: Array<{ top: number }> = []
let origRaf: typeof globalThis.requestAnimationFrame
let origCancel: typeof globalThis.cancelAnimationFrame

function stubScrollTo() {
  Object.defineProperty(window, "scrollTo", {
    value: (_x: number, y: number) => {
      scrollCalls.push({ top: y })
    },
    configurable: true,
    writable: true,
  })
}

function stubMetrics(scrollHeight: number, clientHeight: number) {
  Object.defineProperty(document.documentElement, "scrollHeight", {
    value: scrollHeight,
    configurable: true,
  })
  Object.defineProperty(document.documentElement, "clientHeight", {
    value: clientHeight,
    configurable: true,
  })
}

function stubEnvironment(scrollHeight: number, clientHeight: number) {
  scrollCalls = []
  origRaf = globalThis.requestAnimationFrame
  origCancel = globalThis.cancelAnimationFrame
  const syncRaf: typeof globalThis.requestAnimationFrame = (cb) => {
    cb(0)
    return 0
  }
  const noopCancel: typeof globalThis.cancelAnimationFrame = () => {}
  globalThis.requestAnimationFrame = syncRaf
  globalThis.cancelAnimationFrame = noopCancel
  stubMetrics(scrollHeight, clientHeight)
  stubScrollTo()
}

function Harness(props: {
  ready: boolean
  fraction: number | undefined
  resetKey: string
  resolveScrollTop?: (fraction: number) => number
  suppressRef?: RefObject<boolean>
  holdEligible?: boolean
  onHeld?: (held: boolean) => void
}) {
  const internalSuppressRef = useRef(false)
  const { held } = useRestoreReadPosition({
    ready: props.ready,
    fraction: props.fraction,
    resetKey: props.resetKey,
    suppressRef: props.suppressRef ?? internalSuppressRef,
    resolveScrollTop: props.resolveScrollTop,
    holdEligible: props.holdEligible,
  })
  props.onHeld?.(held)
  return null
}

beforeEach(() => {
  stubEnvironment(1000, 500)
})
afterEach(() => {
  cleanup()
  globalThis.requestAnimationFrame = origRaf
  globalThis.cancelAnimationFrame = origCancel
})

describe("useRestoreReadPosition", () => {
  it("scrolls once to fraction * scrollable when ready with a partial fraction", () => {
    render(<Harness ready fraction={0.4} resetKey="c1" />)
    expect(scrollCalls).toEqual([{ top: 200 }])
  })

  it("does not scroll when the resolved fraction is undefined (stay at top)", () => {
    render(<Harness ready fraction={undefined} resetKey="c1" />)
    expect(scrollCalls).toHaveLength(0)
  })

  it("does not scroll for a near-zero fraction (below the min threshold)", () => {
    render(<Harness ready fraction={0.005} resetKey="c1" />)
    expect(scrollCalls).toHaveLength(0)
  })

  it("does not scroll until ready", () => {
    render(<Harness ready={false} fraction={0.4} resetKey="c1" />)
    expect(scrollCalls).toHaveLength(0)
  })

  it("restores at most once per chapter (a re-render does not re-scroll)", () => {
    const { rerender } = render(<Harness ready fraction={0.4} resetKey="c1" />)
    expect(scrollCalls).toHaveLength(1)
    rerender(<Harness ready fraction={0.4} resetKey="c1" />)
    expect(scrollCalls).toHaveLength(1)
  })

  it("restores again when the chapter (resetKey) changes", () => {
    const { rerender } = render(<Harness ready fraction={0.4} resetKey="c1" />)
    expect(scrollCalls).toHaveLength(1)
    rerender(<Harness ready fraction={0.6} resetKey="c2" />)
    expect(scrollCalls).toEqual([{ top: 200 }, { top: 300 }])
  })

  describe("user-intent cancel (#14969)", () => {
    let queue: Array<() => void>

    beforeEach(() => {
      stubMetrics(500, 500)
      queue = []
      const queuedRaf: typeof globalThis.requestAnimationFrame = (cb) => {
        queue.push(() => cb(0))
        return queue.length
      }
      globalThis.requestAnimationFrame = queuedRaf
    })

    it("abandons a pending restore when the reader scrolls first", () => {
      render(<Harness ready fraction={0.4} resetKey="c1" />)
      expect(scrollCalls).toHaveLength(0)
      expect(queue.length).toBeGreaterThan(0)

      window.dispatchEvent(new Event("wheel"))

      stubMetrics(1000, 500)
      while (queue.length > 0) {
        const frame = queue.shift()
        frame?.()
      }
      expect(scrollCalls).toHaveLength(0)
    })

    it("still applies when no user intent arrives", () => {
      render(<Harness ready fraction={0.4} resetKey="c1" />)
      expect(scrollCalls).toHaveLength(0)

      stubMetrics(1000, 500)
      while (queue.length > 0) {
        const frame = queue.shift()
        frame?.()
      }
      expect(scrollCalls).toEqual([{ top: 200 }])
    })
  })

  describe("content-anchored convergence (#14992)", () => {
    it("re-applies while the resolved scrollTop keeps shifting, then stops", () => {
      const resolved = [200, 260, 260]
      let call = 0
      const resolveScrollTop = () => {
        const value = resolved[Math.min(call, resolved.length - 1)] ?? 0
        call += 1
        return value
      }
      render(<Harness ready fraction={0.4} resetKey="c1" resolveScrollTop={resolveScrollTop} />)
      expect(scrollCalls).toEqual([{ top: 200 }, { top: 260 }])
    })

    it("applies once when the resolved scrollTop is already stable", () => {
      render(<Harness ready fraction={0.4} resetKey="c1" resolveScrollTop={() => 300} />)
      expect(scrollCalls).toEqual([{ top: 300 }])
    })

    it("falls back to the pixel fraction when no resolver is passed", () => {
      render(<Harness ready fraction={0.4} resetKey="c1" />)
      expect(scrollCalls).toEqual([{ top: 200 }])
    })

    it("aborts the convergence loop permanently on user intent mid-loop", () => {
      const queue: Array<() => void> = []
      globalThis.requestAnimationFrame = (cb) => {
        queue.push(() => cb(0))
        return queue.length
      }
      render(<Harness ready fraction={0.4} resetKey="c1" resolveScrollTop={() => 400} />)
      expect(scrollCalls).toEqual([{ top: 400 }])
      expect(queue.length).toBeGreaterThan(0)

      window.dispatchEvent(new Event("wheel"))
      while (queue.length > 0) {
        const frame = queue.shift()
        frame?.()
      }
      expect(scrollCalls).toEqual([{ top: 400 }])
    })
  })

  describe("post-convergence settle watch (#15287)", () => {
    let queue: Array<() => void>
    let clock: number
    let observedTop: number
    let origNow: () => number

    beforeEach(() => {
      queue = []
      globalThis.requestAnimationFrame = (cb) => {
        queue.push(() => cb(0))
        return queue.length
      }
      clock = 0
      origNow = globalThis.performance.now
      Object.defineProperty(globalThis.performance, "now", {
        value: () => clock,
        configurable: true,
        writable: true,
      })
      observedTop = 0
      Object.defineProperty(document.documentElement, "scrollTop", {
        get: () => observedTop,
        configurable: true,
      })
    })

    afterEach(() => {
      Object.defineProperty(globalThis.performance, "now", {
        value: origNow,
        configurable: true,
        writable: true,
      })
      Object.defineProperty(document.documentElement, "scrollTop", {
        value: 0,
        configurable: true,
        writable: true,
      })
    })

    const step = () => act(() => queue.shift()?.())
    const drain = (maxSteps = 500) => {
      let n = 0
      while (queue.length > 0 && n < maxSteps) {
        step()
        n += 1
      }
    }

    it("applies the restore scroll exactly once — the settle watch never re-applies", () => {
      render(
        <Harness ready fraction={0.4} resetKey="c1" holdEligible resolveScrollTop={() => 300} />
      )
      expect(scrollCalls).toEqual([{ top: 300 }])
      observedTop = 300
      step()
      clock += SETTLE_QUIET_MS + 10
      drain()
      expect(scrollCalls).toEqual([{ top: 300 }])
    })

    it("holds through the iOS deferred flush and reveals only after it settles", () => {
      const helds: boolean[] = []
      render(
        <Harness
          ready
          fraction={0.4}
          resetKey="c1"
          holdEligible
          resolveScrollTop={() => 300}
          onHeld={(h) => helds.push(h)}
        />
      )
      expect(helds[0]).toBe(true)
      observedTop = 300
      step()

      clock += 150
      step()
      expect(helds.at(-1)).toBe(true)

      observedTop = 670
      clock += 20
      step()
      expect(helds.at(-1)).toBe(true)

      clock += 150
      step()
      expect(helds.at(-1)).toBe(true)

      clock += SETTLE_QUIET_MS
      drain()
      expect(helds.at(-1)).toBe(false)
      expect(scrollCalls).toEqual([{ top: 300 }])
    })

    it("a scroll intent during the settle watch cancels and reveals immediately", () => {
      const helds: boolean[] = []
      render(
        <Harness
          ready
          fraction={0.4}
          resetKey="c1"
          holdEligible
          resolveScrollTop={() => 300}
          onHeld={(h) => helds.push(h)}
        />
      )
      observedTop = 300
      step()
      expect(helds.at(-1)).toBe(true)
      act(() => window.dispatchEvent(new Event("wheel")))
      expect(helds.at(-1)).toBe(false)
      expect(scrollCalls).toEqual([{ top: 300 }])
    })

    it("the convergence seed still terminates when the target never stabilizes", () => {
      let call = 0
      const resolveScrollTop = () => {
        const value = call * 10
        call += 1
        return value
      }
      render(
        <Harness
          ready
          fraction={0.4}
          resetKey="c1"
          holdEligible
          resolveScrollTop={resolveScrollTop}
        />
      )
      drain()
      expect(scrollCalls).toHaveLength(10)
    })
  })

  describe("reveal gate (#15018)", () => {
    it("never holds on the cold path (not holdEligible)", () => {
      const helds: boolean[] = []
      render(<Harness ready fraction={0.4} resetKey="c1" onHeld={(h) => helds.push(h)} />)
      expect(helds.every((h) => h === false)).toBe(true)
    })

    it("holds on the restore path, then reveals once the reflow settles", () => {
      const helds: boolean[] = []
      render(
        <Harness
          ready
          fraction={0.4}
          resetKey="c1"
          holdEligible
          resolveScrollTop={() => 300}
          onHeld={(h) => helds.push(h)}
        />
      )
      expect(helds[0]).toBe(true)
      expect(helds.at(-1)).toBe(false)
    })

    it("re-holds when the chapter (resetKey) changes", () => {
      const helds: boolean[] = []
      const { rerender } = render(
        <Harness
          ready
          fraction={0.4}
          resetKey="c1"
          holdEligible
          resolveScrollTop={() => 300}
          onHeld={(h) => helds.push(h)}
        />
      )
      expect(helds.at(-1)).toBe(false)
      helds.length = 0
      rerender(
        <Harness
          ready
          fraction={0.6}
          resetKey="c2"
          holdEligible
          resolveScrollTop={() => 400}
          onHeld={(h) => helds.push(h)}
        />
      )
      expect(helds[0]).toBe(true)
      expect(helds.at(-1)).toBe(false)
    })

    it("reveals via the bounded belt when the reflow never settles", () => {
      const timers: Array<() => void> = []
      const origSetTimeout = window.setTimeout
      Object.defineProperty(window, "setTimeout", {
        value: (cb: () => void) => {
          timers.push(cb)
          return timers.length
        },
        configurable: true,
        writable: true,
      })
      try {
        const helds: boolean[] = []
        const { rerender } = render(
          <Harness
            ready={false}
            fraction={0.4}
            resetKey="c1"
            holdEligible
            onHeld={(h) => helds.push(h)}
          />
        )
        expect(helds.at(-1)).toBe(true)
        expect(timers.length).toBeGreaterThan(0)
        act(() => {
          for (const fire of timers) fire()
        })
        helds.length = 0
        rerender(
          <Harness
            ready={false}
            fraction={0.4}
            resetKey="c1"
            holdEligible
            onHeld={(h) => helds.push(h)}
          />
        )
        expect(helds.at(-1)).toBe(false)
      } finally {
        Object.defineProperty(window, "setTimeout", {
          value: origSetTimeout,
          configurable: true,
          writable: true,
        })
      }
    })
  })
})
