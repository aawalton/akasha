import { afterEach, describe, expect, test } from "bun:test"
import { type StoreDiagnostic, setStoreDiagnosticsSink } from "./diagnostics"
import { reportPagesStoreStall } from "./report-stall"

afterEach(() => {
  setStoreDiagnosticsSink(null)
})

describe("reportPagesStoreStall", () => {
  test("emits a single hydrate-overrun diagnostic, then de-dupes per page load", () => {
    const received: StoreDiagnostic[] = []
    setStoreDiagnosticsSink((d) => {
      received.push(d)
    })
    reportPagesStoreStall()
    reportPagesStoreStall()
    expect(received.length).toBeLessThanOrEqual(1)
    for (const diagnostic of received) {
      expect(diagnostic.reason).toBe("hydrate-overrun")
      expect(typeof diagnostic.detail).toBe("string")
    }
  })
})
