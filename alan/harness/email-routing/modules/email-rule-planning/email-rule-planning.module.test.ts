import { expect, test } from "bun:test"
import {
  addressesDeclared,
  addressIn,
  forwardedTo,
  namedFor,
  plannedOver,
  type RoutingRule,
  saidOf,
} from "akasha/alan/harness/email-routing/modules/email-rule-planning/email-rule-planning.module.code.ts"

const DOMAIN = "alanwalton.com"

const ONWARD = "somewhere@example.com"

const AKASHA = "akasha@alanwalton.com"

const AMY = "amy@alanwalton.com"

const AURA = "aura@alanwalton.com"

const ALAN = "alan@alanwalton.com"

const forwarding = (address: string, name: string, enabled = true): RoutingRule => ({
  name,
  enabled,
  matchers: [{ type: "literal", field: "to", value: address }],
  actions: [{ type: "forward", value: [ONWARD] }],
})

const auto = (address: string): RoutingRule => forwarding(address, namedFor(address, ONWARD))

const CATCH_ALL: RoutingRule = {
  name: "",
  enabled: false,
  matchers: [{ type: "all" }],
  actions: [{ type: "drop" }],
}

const RULES: readonly RoutingRule[] = [
  auto(AURA),
  forwarding(AMY, ""),
  forwarding(ALAN, "Rule created at 2026-02-08T14:31:22.926Z"),
  CATCH_ALL,
]

const DECLARED: readonly string[] = [AKASHA, AMY, AURA]

test("an address no rule claims is planned a rule of its own", () => {
  expect(plannedOver(DECLARED, RULES, ONWARD).writing.map((one) => one.address)).toEqual([AKASHA])
})

test("an address a hand-made rule claims is already routed, though that rule has no name", () => {
  expect(plannedOver(DECLARED, RULES, ONWARD).routed).toContain(AMY)
})

test("an address a managed rule claims is already routed", () => {
  expect(plannedOver(DECLARED, RULES, ONWARD).routed).toContain(AURA)
})

test("a routed address no persona declares is named rather than taken away", () => {
  expect(plannedOver(DECLARED, RULES, ONWARD).unclaimed).toEqual([ALAN])
})

test("a plan over the rules its own last plan wrote plans nothing", () => {
  const first = plannedOver(DECLARED, RULES, ONWARD)
  const after = [...RULES, ...first.writing.map((one) => one.rule)]
  expect(plannedOver(DECLARED, after, ONWARD).writing).toEqual([])
})

test("a second plan finds every declared address routed", () => {
  const first = plannedOver(DECLARED, RULES, ONWARD)
  const after = [...RULES, ...first.writing.map((one) => one.rule)]
  expect(plannedOver(DECLARED, after, ONWARD).routed).toEqual([AKASHA, AMY, AURA])
})

test("an address claimed only by a rule turned off is named rather than claimed twice", () => {
  const off = [forwarding(AKASHA, "", false), ...RULES]
  const plan = plannedOver(DECLARED, off, ONWARD)
  expect(plan.off).toEqual([AKASHA])
  expect(plan.writing).toEqual([])
})

test("the rule planned matches the address literally on `to`", () => {
  const one = plannedOver(DECLARED, RULES, ONWARD).writing[0]
  expect(one?.rule.matchers).toEqual([{ type: "literal", field: "to", value: AKASHA }])
})

test("the rule planned forwards once, to the address read back from the zone", () => {
  const one = plannedOver(DECLARED, RULES, ONWARD).writing[0]
  expect(one?.rule.actions).toEqual([{ type: "forward", value: [ONWARD] }])
})

test("the rule planned is enabled, because a rule written turned off routes nothing", () => {
  expect(plannedOver(DECLARED, RULES, ONWARD).writing[0]?.rule.enabled).toBe(true)
})

test("the rule planned is named by the convention the surviving rules keep", () => {
  expect(plannedOver(DECLARED, RULES, ONWARD).writing[0]?.rule.name).toBe(
    `persona-auto: ${AKASHA} -> ${ONWARD}`
  )
})

test("a catch-all rule claims no address, so it neither routes nor reads as unclaimed", () => {
  expect(addressIn(CATCH_ALL)).toBeNull()
})

test("a matcher on a field other than `to` claims no address", () => {
  expect(
    addressIn({ matchers: [{ type: "literal", field: "from", value: AMY }], actions: [] })
  ).toBeNull()
})

test("an address is claimed however it was cased", () => {
  const shouted = [forwarding("AKASHA@AlanWalton.com", "")]
  expect(plannedOver([AKASHA], shouted, ONWARD).writing).toEqual([])
})

test("the destination is copied from the rules the convention names", () => {
  const astray = [...RULES, forwarding(ALAN, "elsewhere")]
  expect(forwardedTo(astray)).toBe(ONWARD)
})

test("where no rule carries that name, every rule that forwards is read instead", () => {
  expect(forwardedTo([forwarding(AMY, ""), CATCH_ALL])).toBe(ONWARD)
})

test("more than one destination is refused rather than chosen between", () => {
  const split: RoutingRule = {
    name: namedFor(AMY, "other@example.com"),
    enabled: true,
    matchers: [{ type: "literal", field: "to", value: AMY }],
    actions: [{ type: "forward", value: ["other@example.com"] }],
  }
  expect(() => forwardedTo([...RULES, split])).toThrow("2 addresses are forwarded to")
})

test("no rule forwarding anywhere is refused rather than filled in from elsewhere", () => {
  expect(() => forwardedTo([CATCH_ALL])).toThrow("nothing to copy a destination from")
})

test("a persona declaring no address declares nothing to route", () => {
  expect(addressesDeclared([{ email: null }], DOMAIN)).toEqual([])
})

test("an address outside the zone's domain is left out", () => {
  expect(addressesDeclared([{ email: "aura@example.com" }], DOMAIN)).toEqual([])
})

test("declared addresses come back folded, deduped and sorted", () => {
  const declaring = [{ email: AURA }, { email: "AURA@alanwalton.com" }, { email: AKASHA }]
  expect(addressesDeclared(declaring, DOMAIN)).toEqual([AKASHA, AURA])
})

test("a run says each address it routed", () => {
  const said = saidOf(plannedOver(DECLARED, RULES, ONWARD))
  expect(said[0]).toBe("1 address routed")
  expect(said[1]).toBe(`  routed ${AKASHA}`)
})

test("more than one address routed is said in the plural", () => {
  const plan = plannedOver([AKASHA, "ceri@alanwalton.com"], RULES, ONWARD)
  expect(saidOf(plan)[0]).toBe("2 addresses routed")
})

test("a run with nothing to route says so rather than saying nothing", () => {
  expect(saidOf(plannedOver([AURA], RULES, ONWARD))[0]).toBe("0 addresses routed")
})

test("an unclaimed address is said as left alone", () => {
  expect(saidOf(plannedOver(DECLARED, RULES, ONWARD))).toContain(
    `  ${ALAN} is routed and no persona declares it, so it is left as it is`
  )
})
