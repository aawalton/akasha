import { expect, test } from "bun:test"
import { renderAuditReading, summarizeAudit } from "./audit-reading.module.code.ts"

test("a scan that saw nothing is no population rather than a finding of none", () => {
  const reading = summarizeAudit({ scanned: 0, compared: 0, findings: 0, coverage: "complete" })
  expect(reading.kind).toBe("no-population")
  expect(renderAuditReading("subject", reading).join("\n")).toContain("this is not a zero")
})

test("scanning without weighing is not a zero", () => {
  const reading = summarizeAudit({ scanned: 9, compared: 0, findings: 0, coverage: "complete" })
  const lines = renderAuditReading("subject", reading)
  expect(lines[0]).toContain("scanned=9")
  expect(lines[1]).toBe("  9 scanned and none could be weighed — this is not a zero.")
})

test("a zero from a comparison that ran says the comparison ran", () => {
  const reading = summarizeAudit({ scanned: 9, compared: 9, findings: 0, coverage: "complete" })
  const lines = renderAuditReading("subject", reading)
  expect(lines[1]).toBe("  9 weighed and none is the class — a zero from a comparison that ran.")
  expect(lines).toHaveLength(2)
})

test("findings are counted against what was weighed, not against what was scanned", () => {
  const reading = summarizeAudit({ scanned: 90, compared: 9, findings: 2, coverage: "complete" })
  expect(renderAuditReading("subject", reading)[1]).toBe("  2 of 9 weighed are the class.")
})

test("a truncated scan states its counts as a floor", () => {
  const reading = summarizeAudit({ scanned: 9, compared: 9, findings: 1, coverage: "truncated" })
  const lines = renderAuditReading("subject", reading)
  expect(lines).toHaveLength(3)
  expect(lines[2]).toContain("FLOOR rather than a census")
  // The old wording said the scan "came back full", which reads as *complete* — the opposite
  // of the branch it stands on.
  expect(lines[2]).not.toContain("came back full")
})

test("a complete scan adds no floor line", () => {
  const reading = summarizeAudit({ scanned: 9, compared: 9, findings: 1, coverage: "complete" })
  expect(renderAuditReading("subject", reading)).toHaveLength(2)
})
