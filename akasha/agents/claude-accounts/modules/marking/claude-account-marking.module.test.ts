import { afterAll, expect, test } from "bun:test"
import { chmodSync, readFileSync } from "node:fs"
import { join } from "node:path"
import {
  everyAccountSlugIn,
  everyAccountStateIn,
} from "../reading/claude-account-reading.module.code.ts"
import {
  atLimitMarks,
  type Given,
  heldBesideIn,
  instantOf,
  markedIn,
  pacingMarks,
  routingFrom,
  subscriptionMarks,
  unfitFor,
  usageFrom,
} from "./claude-account-marking.module.code.ts"
import {
  ACCOUNT_DECLARED,
  accountWritten,
  BESIDE_KEYS,
  bareTypeIn,
  besideAt,
  besideHeld,
  besideOf,
  besideText,
  bodiesIn,
  carriedOf,
  counting,
  FAKE_TOKEN,
  filed,
  heldIn,
  keysOf,
  MS_A_WEEK,
  MS_AT_MOST,
  MS_FIVE_HOURS,
  markedFor,
  markedWhy,
  NO_FIELD,
  NO_MARK,
  NO_MARK_WHY,
  NOW,
  PACING_KEYS,
  PAIR,
  pageAt,
  RAW_USAGE,
  RESETS_AT,
  rawWith,
  refusalOf,
  rootFor,
  routed,
  routedFor,
  sweep,
  USAGE,
  USAGE_UNKNOWN,
  whyOf,
  worldMade,
} from "./claude-account-marking.module.test-fixtures.ts"

afterAll(sweep)

test("a declaration routes by whether that declaration says uncommitted or secret", () => {
  const said = routingFrom([
    carriedOf("terminalAt", { uncommitted: true }),
    carriedOf("accessToken", { secret: true }),
    carriedOf("email"),
  ])
  expect([...said.beside]).toEqual(["terminalAt"])
  expect([...said.secret]).toEqual(["accessToken"])
  expect([...said.stated]).toEqual(["email"])
})

test("a declaration marked both secret and uncommitted routes as a secret", () => {
  const said = routingFrom([carriedOf("accessToken", { secret: true, uncommitted: true })])
  expect([...said.secret]).toEqual(["accessToken"])
  expect([...said.beside]).toEqual([])
})

test("the routing is read off the claude-account page type and the type above it", () => {
  const said = routedFor(worldMade())
  expect([...said.beside].sort()).toEqual([...BESIDE_KEYS].sort())
  expect([...said.secret].sort()).toEqual(["accessToken", "refreshToken"])
  expect(said.stated.has("email")).toBe(true)
  expect(said.stated.has("slug")).toBe(true)
  expect(said.stated.has("pageTypeSlug")).toBe(true)
})

test("a page type declaring nothing refuses to say where a mark is written", () => {
  const root = bareTypeIn("marking-bare-")
  expect(() => routedFor(root)).toThrow(/where to write one is unknown/)
})

test("a key the declaration stops calling uncommitted is no longer written beside", () => {
  const root = worldMade(
    ACCOUNT_DECLARED.map((one) =>
      one.slug === "five-hour-percent-used" ? { slug: one.slug } : one
    )
  )
  expect(routedFor(root).beside.has("fiveHourPercentUsed")).toBe(false)
  expect(markedWhy(root, "aine", { fiveHourPercentUsed: 5 })).toContain("what the account states")
})

test("a key the declaration newly calls uncommitted is written beside", () => {
  const root = worldMade([...ACCOUNT_DECLARED, { slug: "weather-noted-at", uncommitted: true }])
  expect(routedFor(root).beside.has("weatherNotedAt")).toBe(true)
  expect(heldIn(root, "aine", { weatherNotedAt: RESETS_AT })["weatherNotedAt"]).toBe(RESETS_AT)
})

test("a mark naming an uncommitted key is sorted beside the page", () => {
  expect(besideOf(routed(), { terminalAt: RESETS_AT, fiveHourPercentUsed: 12 })).toEqual({
    terminalAt: RESETS_AT,
    fiveHourPercentUsed: 12,
  })
})

test("a mark is refused by where its key routes", () => {
  expect(refusalOf(routed(), { accessToken: FAKE_TOKEN })).toContain("is a secret the sops file")
  expect(refusalOf(routed(), { email: "aine@a.test" })).toContain("is what the account states")
  expect(refusalOf(routed(), { rescuedCredential: "x" })).toContain("names nothing")
})

test("a mark naming a prototype key is refused", () => {
  const marks: Given = JSON.parse('{"__proto__":"x"}')
  expect(Object.getOwnPropertyNames(marks)).toEqual(["__proto__"])
  expect(refusalOf(routed(), marks)).toContain("`__proto__` names nothing")
})

test("a key is refused for where it routes before that key's value is weighed", () => {
  expect(refusalOf(routed(), { email: "one\ntwo" })).toContain("is what the account states")
  expect(refusalOf(routed(), { unheardOf: "one\ntwo" })).toContain("names nothing")
  expect(refusalOf(routed(), { unheardOf: "x", accessToken: FAKE_TOKEN })).toContain(
    "names nothing"
  )
  expect(refusalOf(routed(), { accessToken: FAKE_TOKEN, email: "z" })).toContain("is a secret")
})

test("a mark carrying a newline or blank text is refused", () => {
  expect(refusalOf(routed(), { terminalAt: "one\ntwo" })).toContain("carries a newline")
  expect(refusalOf(routed(), { terminalAt: "" })).toContain("arrived empty")
  expect(refusalOf(routed(), { terminalAt: "  \t " })).toContain("arrived empty")
  expect(unfitFor("terminalAt", 12)).toBe(null)
  expect(unfitFor("terminalAt", null)).toBe(null)
  expect(unfitFor("terminalAt", RESETS_AT)).toBe(null)
})

test("a mark that is no text, no number, no record and no removal is refused", () => {
  for (const one of NO_MARK) {
    expect(refusalOf(routed(), { terminalAt: one })).toContain(NO_MARK_WHY)
  }
})

test("a record mark is sorted field by field", () => {
  expect(besideOf(routed(), { terminalAt: PAIR })).toEqual({ terminalAt: PAIR })
})

test("a record mark carrying a field that is no mark is refused", () => {
  for (const [held, why] of NO_FIELD) {
    expect(refusalOf(routed(), { terminalAt: held })).toContain(why)
  }
})

test("a mark carrying null, zero or no key at all sorts as handed in", () => {
  expect(besideOf(routed(), { terminalAt: null })).toEqual({ terminalAt: null })
  expect(besideOf(routed(), { fiveHourPercentUsed: 0 })).toEqual({ fiveHourPercentUsed: 0 })
  expect(besideOf(routed(), {})).toEqual({})
})

test("a mark is written beside the account's page and merges into what is there", () => {
  const root = worldMade()
  const said = markedFor(root, "aine", { retryAllowedAt: RESETS_AT })
  expect(keysOf(said)).toEqual(["retryAllowedAt"])
  const held = besideHeld(root, "aine")
  expect(held["retryAllowedAt"]).toBe(RESETS_AT)
  expect(held["fiveHourPercentUsed"]).toBe(12)
  expect(held["terminalAt"]).toBe(RESETS_AT)
})

test("a number reaches the file beside the page as a number", () => {
  const root = worldMade()
  expect(heldIn(root, "ctw", { fiveHourPercentUsed: 12.5 })["fiveHourPercentUsed"]).toBe(12.5)
  expect(besideText(root, "ctw")).toContain(`"fiveHourPercentUsed": 12.5`)
  expect(besideText(root, "ctw")).not.toContain(`"12.5"`)
})

test("a null mark takes its key away from beside the page", () => {
  const root = worldMade()
  expect(besideHeld(root, "aine")["terminalAt"]).toBe(RESETS_AT)
  const held = heldIn(root, "aine", { terminalAt: null })
  expect("terminalAt" in held).toBe(false)
  expect(held["fiveHourPercentUsed"]).toBe(12)
})

test("a mark writing and removing at once does both", () => {
  const root = worldMade()
  const said = markedFor(root, "aine", { terminalAt: null, retryAllowedAt: RESETS_AT })
  expect(keysOf(said)).toEqual(["retryAllowedAt", "terminalAt"])
  expect("terminalAt" in besideHeld(root, "aine")).toBe(false)
  expect(besideHeld(root, "aine")["retryAllowedAt"]).toBe(RESETS_AT)
})

test("an account no page is filed for is answered as absent", () => {
  const said = markedFor(worldMade(), "nobody", { terminalAt: RESETS_AT })
  expect(said.kind).toBe("absent")
  expect(whyOf(said)).toContain("no page is filed for `nobody`")
})

test("a mark holding no value to write leaves the page unchanged", () => {
  const root = worldMade()
  const before = besideText(root, "aine")
  expect(markedFor(root, "aine", {}).kind).toBe("unchanged")
  expect(besideText(root, "aine")).toBe(before)
})

test("a mark the routing refuses is refused rather than written", () => {
  const root = worldMade()
  const before = besideText(root, "aine")
  const why = markedWhy(root, "aine", { accessToken: FAKE_TOKEN })
  expect(why).toContain("is a secret")
  expect(why).not.toContain(FAKE_TOKEN)
  expect(besideText(root, "aine")).toBe(before)
  expect(markedFor(root, "aine", { email: "other@a.test" }).kind).toBe("refused")
  expect(readFileSync(join(root, pageAt("aine")), "utf8")).toContain("aine@a.test")
})

test("a page type that cannot be read refuses the mark", () => {
  const root = bareTypeIn("marking-typeless-")
  accountWritten(root, "aine", null)
  const why = markedWhy(root, "aine", { terminalAt: RESETS_AT })
  expect(why).toContain("the mark threw, which it is written never to do")
  expect(why).toContain("where to write one is unknown")
})

test("a file beside a page that will not load refuses the mark rather than throwing", () => {
  const root = worldMade()
  filed(root, besideAt("aine"), "this is not a page body\n")
  expect(markedWhy(root, "aine", { retryAllowedAt: RESETS_AT })).toContain(
    "was not written beside its page"
  )
})

test("a root filing no index refuses the mark rather than throwing", () => {
  const root = rootFor("marking-none-")
  expect(markedFor(root, "aine", { terminalAt: RESETS_AT }).kind).toBe("refused")
})

test("the value beside a page keeps Object as its prototype", () => {
  const root = worldMade()
  expect(Object.getPrototypeOf(heldIn(root, "aine", { retryAllowedAt: RESETS_AT }))).toBe(
    Object.prototype
  )
})

test("writing beside a page answers with why rather than throwing", () => {
  const root = worldMade()
  expect(heldBesideIn(root, pageAt("aine"), { terminalAt: RESETS_AT })).toBe(null)
  expect(heldBesideIn(root, "no-typescript-file", { terminalAt: RESETS_AT })).toContain(
    "no TypeScript file"
  )
})

test("marking one account opens no other account's page", () => {
  const root = worldMade()
  for (const one of ["aine", "aow"]) chmodSync(join(root, pageAt(one)), 0o000)
  expect(() => everyAccountStateIn(root)).toThrow()
  expect(heldIn(root, "ctw", { retryAllowedAt: RESETS_AT })["retryAllowedAt"]).toBe(RESETS_AT)
  for (const one of ["aine", "aow"]) chmodSync(join(root, pageAt(one)), 0o644)
})

test("marking one account lists no directory the accounts are filed under", () => {
  const root = worldMade()
  const fleet = counting(root)
  expect(everyAccountSlugIn(fleet.reading)).toEqual(["aine", "aow", "ctw"])
  expect(fleet.seen).toContain("identity/claude-account/slug")
  const one = counting(root)
  const said = markedIn(root, "aine", { retryAllowedAt: RESETS_AT }, one.reading, bodiesIn(root))
  expect(said.kind).toBe("held")
  expect(one.seen.filter((at) => at.startsWith("identity/claude-account"))).toEqual([])
})

test("marking one account with the routing handed in lists nothing at all", () => {
  const root = worldMade()
  const routing = routedFor(root)
  const one = counting(root)
  const held = bodiesIn(root)
  expect(markedIn(root, "aine", { terminalAt: null }, one.reading, held, routing).kind).toBe("held")
  expect(one.seen).toEqual([])
})

test("the at-limit mark is the moment handed in plus the default backoff", () => {
  expect(atLimitMarks(NOW, null)).toEqual({ retryAllowedAt: new Date(NOW + 5_000).toISOString() })
})

test("a Retry-After of whole seconds sets the at-limit mark", () => {
  expect(atLimitMarks(NOW, "30")).toEqual({ retryAllowedAt: new Date(NOW + 30_000).toISOString() })
})

test("a Retry-After above the cap is capped at five hours", () => {
  expect(atLimitMarks(NOW, "999999")).toEqual({
    retryAllowedAt: new Date(NOW + MS_FIVE_HOURS).toISOString(),
  })
})

test("a moment no date holds carries no at-limit mark", () => {
  expect(atLimitMarks(NaN, null)).toEqual({})
  expect(atLimitMarks(Infinity, "30")).toEqual({})
  expect(atLimitMarks(MS_AT_MOST, "30")).toEqual({})
  expect(instantOf(MS_AT_MOST)).toBe("+275760-09-13T00:00:00.000Z")
  expect(instantOf(MS_AT_MOST + 1)).toBe(null)
  expect(instantOf(0)).toBe("1970-01-01T00:00:00.000Z")
  expect(markedFor(worldMade(), "aine", atLimitMarks(NaN, null)).kind).toBe("unchanged")
})

test("the subscription mark carries the reason as the text that reason is", () => {
  expect(subscriptionMarks("withdrawn upstream")).toEqual({
    subscriptionDisabledReason: "withdrawn upstream",
  })
  expect(subscriptionMarks(null)).toEqual({ subscriptionDisabledReason: null })
})

test("the subscription reason reaches the page unquoted", () => {
  const root = worldMade()
  const held = heldIn(root, "aine", subscriptionMarks("withdrawn upstream"))
  expect(held["subscriptionDisabledReason"]).toBe("withdrawn upstream")
  expect(besideText(root, "aine")).toContain(`"subscriptionDisabledReason": "withdrawn upstream"`)
  expect("subscriptionDisabledReason" in heldIn(root, "aine", subscriptionMarks(null))).toBe(false)
})

test("a usage body is read into akasha's own names", () => {
  expect(usageFrom(RAW_USAGE)).toEqual(USAGE)
})

test("a usage body the wire shape refuses is answered as no usage", () => {
  expect(usageFrom(null)).toBe(null)
  expect(usageFrom({ five_hour: { utilization: 12, resets_at: null } })).toBe(null)
  for (const one of [NaN, Infinity, "12"]) expect(usageFrom(rawWith(one))).toBe(null)
})

test("the pacing mark carries each window's percentage used and reset moment", () => {
  const said = pacingMarks(NOW, USAGE)
  expect(said["fiveHourPercentUsed"]).toBe(12.5)
  expect(said["sevenDayPercentUsed"]).toBe(40)
  expect(said["fiveHourResetsAt"]).toBe(RESETS_AT)
  expect(said["sevenDayResetsAt"]).toBe(RESETS_AT)
})

test("the pacing mark carries each window's opening moment", () => {
  const said = pacingMarks(NOW, USAGE)
  const at = Date.parse(RESETS_AT)
  expect(said["fiveHourStartedAt"]).toBe(new Date(at - MS_FIVE_HOURS).toISOString())
  expect(said["sevenDayStartedAt"]).toBe(new Date(at - MS_A_WEEK).toISOString())
})

test("the pacing mark carries the moment the usage was read", () => {
  expect(pacingMarks(NOW, USAGE)["usageReadAt"]).toBe(new Date(NOW).toISOString())
})

test("a pacing mark whose reset is unknown carries a removal", () => {
  const said = pacingMarks(NOW, USAGE_UNKNOWN)
  expect(said["fiveHourResetsAt"]).toBe(null)
  expect(said["sevenDayResetsAt"]).toBe(null)
  expect(said["fiveHourStartedAt"]).toBe(null)
  expect(said["sevenDayStartedAt"]).toBe(null)
})

test("a pacing mark reaches the page under every key the page type declares", () => {
  const root = worldMade()
  const routing = routedFor(root)
  const said = markedFor(root, "aine", pacingMarks(NOW, USAGE), routing)
  expect(keysOf(said)).toEqual(PACING_KEYS)
  for (const key of keysOf(said)) expect(routing.beside.has(key)).toBe(true)
  expect(besideHeld(root, "aine")["fiveHourPercentUsed"]).toBe(12.5)
  expect(besideHeld(root, "aine")["usageReadAt"]).toBe(new Date(NOW).toISOString())
})

test("a pacing mark whose reset is unknown takes the reset last written away", () => {
  const root = worldMade()
  expect(heldIn(root, "aine", { fiveHourResetsAt: RESETS_AT })["fiveHourResetsAt"]).toBe(RESETS_AT)
  expect("fiveHourResetsAt" in heldIn(root, "aine", pacingMarks(NOW, USAGE_UNKNOWN))).toBe(false)
})
