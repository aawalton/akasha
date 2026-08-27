import { afterEach, describe, expect, mock, test } from "bun:test"
import { emitStoreDiagnostic, type StoreDiagnostic, setStoreDiagnosticsSink } from "./diagnostics"

afterEach(() => {
  setStoreDiagnosticsSink(null)
})

const SAMPLE: StoreDiagnostic = {
  reason: "leader-unresponsive",
  message: "pages-ui-store leader unresponsive: acquireSlug timed out after 30000ms",
  detail: "control RPC timed out against the elected leader (wedged, or takeover never completed)",
}

describe("emitStoreDiagnostic", () => {
  test("no-ops (does not throw) when no sink is wired", () => {
    expect(() => emitStoreDiagnostic(SAMPLE)).not.toThrow()
  })

  test("forwards the diagnostic to a wired sink", () => {
    const received: StoreDiagnostic[] = []
    setStoreDiagnosticsSink((d) => {
      received.push(d)
    })
    emitStoreDiagnostic(SAMPLE)
    expect(received).toEqual([SAMPLE])
  })

  test("setStoreDiagnosticsSink(null) detaches the sink", () => {
    const sink = mock(() => undefined)
    setStoreDiagnosticsSink(sink)
    setStoreDiagnosticsSink(null)
    emitStoreDiagnostic(SAMPLE)
    expect(sink).not.toHaveBeenCalled()
  })

  test("a throwing sink is caught — emit never propagates the throw", () => {
    setStoreDiagnosticsSink(() => {
      throw new Error("sink boom")
    })
    expect(() => emitStoreDiagnostic(SAMPLE)).not.toThrow()
  })
})
