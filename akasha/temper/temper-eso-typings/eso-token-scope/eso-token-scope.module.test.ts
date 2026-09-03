import { expect, test } from "bun:test"
import type { ParsedTokens } from "./eso-token-scope.module.code.ts"
import { selectOptIn } from "./eso-token-scope.module.code.ts"

const PARSED: ParsedTokens = {
  functions: [
    {
      name: "GetKind",
      params: [{ name: "kind", type: "AbilityType", isOptional: false }],
      returns: [{ name: "out", type: "string" }],
      hasVariableReturns: false,
    },
    { name: "Unwanted", params: [], returns: [], hasVariableReturns: false },
  ],
  objects: [
    { name: "Control", inheritsFrom: [], methods: [] },
    { name: "Button", inheritsFrom: ["Control"], methods: [] },
    { name: "Secret", inheritsFrom: [], methods: [] },
  ],
  events: [
    { name: "EVENT_ONE", params: [{ name: "kind", type: "SlotType" }] },
    { name: "EVENT_TWO", params: [] },
  ],
  enums: [
    { name: "AbilityType", values: ["ABILITY_TYPE_ATTACK"] },
    { name: "SlotType", values: ["SLOT_TYPE_ITEM"] },
    { name: "Unreached", values: ["UNREACHED_ONE"] },
  ],
}

const LIST = {
  functions: ["GetKind"],
  objects: ["Button"],
  events: ["EVENT_ONE"],
  enums: [],
}

test("only the functions and events the list names are taken", () => {
  const taken = selectOptIn(PARSED, LIST)
  expect(taken.functions.map((one) => one.name)).toEqual(["GetKind"])
  expect(taken.events.map((one) => one.name)).toEqual(["EVENT_ONE"])
})

test("an object named carries in the object it inherits from", () => {
  expect(selectOptIn(PARSED, LIST).objects.map((one) => one.name)).toEqual(["Control", "Button"])
})

test("an excluded parent is left out of what an object reaches", () => {
  const taken = selectOptIn(PARSED, { ...LIST, excludeObjects: ["Control"] })
  expect(taken.objects.map((one) => one.name)).toEqual(["Button"])
})

test("an enum a taken signature names is taken and one nothing reaches is not", () => {
  const names = selectOptIn(PARSED, LIST).enums.map((one) => one.name)
  expect(names).toEqual(["AbilityType", "SlotType"])
})

test("a name the dump does not describe is passed over", () => {
  const taken = selectOptIn(PARSED, { ...LIST, objects: ["NoSuchObject"] })
  expect(taken.objects).toEqual([])
})
