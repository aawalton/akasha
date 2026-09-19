import { expect, test } from "bun:test"
import type {
  RoutingRule,
  RuleToWrite,
} from "akasha/alan/harness/email-routing/modules/email-rule-planning/email-rule-planning.module.code.ts"
import {
  type Reaching,
  reconciledOver,
} from "akasha/alan/harness/email-routing/modules/persona-routing-run/persona-routing-run.module.code.ts"

const ONWARD = "somewhere@example.com"

const AKASHA = "akasha@alanwalton.com"

const AURA = "aura@alanwalton.com"

const CERI = "ceri@alanwalton.com"

const auto = (address: string): RoutingRule => ({
  name: `persona-auto: ${address} -> ${ONWARD}`,
  enabled: true,
  matchers: [{ type: "literal", field: "to", value: address }],
  actions: [{ type: "forward", value: [ONWARD] }],
})

interface Zone extends Reaching {
  readonly written: readonly RuleToWrite[]
}

const zoneOf = (held: RoutingRule[], refusing = false): Zone => {
  const written: RuleToWrite[] = []
  return {
    written,
    rules: () => Promise.resolve([...held]),
    write: (rule) => {
      if (refusing) throw new Error("the token cannot write routing rules")
      written.push(rule)
      held.push(rule)
      return Promise.resolve(undefined)
    },
  }
}

test("a run answers the plan it carried out", async () => {
  const plan = await reconciledOver([AKASHA, AURA], zoneOf([auto(AURA)]))
  expect(plan.writing.map((one) => one.address)).toEqual([AKASHA])
})

test("a run routes the address no rule claimed", async () => {
  const zone = zoneOf([auto(AURA)])
  await reconciledOver([AKASHA, AURA], zone)
  expect(zone.written.map((rule) => rule.matchers[0]?.value)).toEqual([AKASHA])
})

test("a second run straight after the first writes nothing", async () => {
  const held = [auto(AURA)]
  await reconciledOver([AKASHA, AURA], zoneOf(held))
  const again = zoneOf(held)
  await reconciledOver([AKASHA, AURA], again)
  expect(again.written).toEqual([])
})

test("each address is named as soon as the rule routing it is written", async () => {
  const done: string[] = []
  await reconciledOver([AKASHA, AURA], zoneOf([auto(AURA)]), done)
  expect(done).toEqual([`routed ${AKASHA}`])
})

test("a write refused is carried out rather than counted as done", async () => {
  const zone = zoneOf([auto(AURA)], true)
  await expect(reconciledOver([AKASHA, AURA], zone)).rejects.toThrow(
    "the token cannot write routing rules"
  )
})

test("a run that threw part way names what it routed before it threw", async () => {
  const zone = zoneOf([auto(AURA)])
  const done: string[] = []
  const stopping: Reaching = {
    rules: zone.rules,
    write: (rule) => {
      if (rule.matchers[0]?.value === CERI) {
        throw new Error("the token cannot write routing rules")
      }
      return zone.write(rule)
    },
  }
  await expect(reconciledOver([AKASHA, CERI], stopping, done)).rejects.toThrow(
    "the token cannot write routing rules"
  )
  expect(done).toEqual([`routed ${AKASHA}`])
})

test("the destination written is the one the rules read already forward to", async () => {
  const zone = zoneOf([auto(AURA)])
  await reconciledOver([AKASHA, AURA], zone)
  expect(zone.written[0]?.actions).toEqual([{ type: "forward", value: [ONWARD] }])
})

test("the rule written is named by the convention the zone already keeps", async () => {
  const zone = zoneOf([auto(AURA)])
  await reconciledOver([AKASHA, AURA], zone)
  expect(zone.written[0]?.name).toBe(`persona-auto: ${AKASHA} -> ${ONWARD}`)
})

test("a zone no rule forwards anywhere in is refused rather than written to", async () => {
  const zone = zoneOf([])
  await expect(reconciledOver([AKASHA], zone)).rejects.toThrow("nothing to copy a destination from")
  expect(zone.written).toEqual([])
})
