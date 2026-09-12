import { expect, test } from "bun:test"
import {
  boundFaultIn,
  dayNameOf,
} from "akasha/agents/seats/log-days/log-day-writing/log-day-writing.module.code.ts"

const SOURCE = "oauth-proxy-console"

const SEAT = "athena"

const DATE = "2026-09-12"

test("a day's slug joins its source to its seat to its date", () => {
  expect(dayNameOf(SOURCE, SEAT, DATE)).toBe("oauth-proxy-console-athena-2026-09-12")
})

test("a source, a seat and a date that name an export are written", () => {
  expect(boundFaultIn(SOURCE, SEAT, DATE)).toBeNull()
  expect(boundFaultIn(SOURCE, "123", DATE)).toBeNull()
})

test("a line carrying no date names no export, so no line is written", () => {
  const said = boundFaultIn(SOURCE, SEAT, "")

  expect(said).toContain("oauthProxyConsoleAthena-")
  expect(said).toContain("no `export const` may be declared under")
  expect(said).toContain("so no line is written")
})

test("a date carrying a quote names no export, so no line is written", () => {
  expect(boundFaultIn(SOURCE, SEAT, '2026"09')).toContain("no `export const` may be declared under")
})

test("a seat name carrying a dot or a slash or a space names no export", () => {
  expect(boundFaultIn(SOURCE, "a.b", DATE)).not.toBeNull()
  expect(boundFaultIn(SOURCE, "a/b", DATE)).not.toBeNull()
  expect(boundFaultIn(SOURCE, "a b", DATE)).not.toBeNull()
})

test("a source naming no export is refused though its day names one", () => {
  expect(boundFaultIn("a/b", SEAT, DATE)).not.toBeNull()
})
