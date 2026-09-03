import { expect, test } from "bun:test"
import {
  parseEnums,
  parseEvents,
  parseFunctions,
  parseObjects,
} from "./eso-doc-tokens.module.code.ts"

const ENUM_DUMP = [
  "h5. AbilityType",
  "* ABILITY_TYPE_ATTACK",
  "* ABILITY_TYPE_HEAL",
  "h5. EmptyKind",
  "h4. Something Else",
].join("\n")

test("an enum is read with every value listed under its heading", () => {
  expect(parseEnums(ENUM_DUMP)).toEqual([
    { name: "AbilityType", values: ["ABILITY_TYPE_ATTACK", "ABILITY_TYPE_HEAL"] },
  ])
})

const FUNCTION_DUMP = [
  "h2. Game API",
  "* GetUnitName(*string* _unitTag_)",
  "** _Returns:_ *string* _name_",
  "",
  "* GetLoot()",
  "** _Uses variable returns..._",
  "** _Returns:_ *integer* _count_",
  "",
  "h2. Object API",
].join("\n")

test("a function carries its parameters and its single return type", () => {
  const [first] = parseFunctions(FUNCTION_DUMP)
  expect(first).toEqual({
    name: "GetUnitName",
    params: [{ name: "unitTag", type: "string", isOptional: false }],
    returns: [{ name: "name", type: "string" }],
    hasVariableReturns: false,
  })
})

test("a function using variable returns says so", () => {
  const found = parseFunctions(FUNCTION_DUMP).find((one) => one.name === "GetLoot")
  expect(found?.hasVariableReturns).toBe(true)
})

test("a documented type outside the map is answered as the dump spells it", () => {
  const dump = ["h2. Game API", "* GetThing(*Widget* _w_)", "", "h2. Object API"].join("\n")
  expect(parseFunctions(dump)[0]?.params[0]?.type).toBe("Widget")
})

const EVENT_DUMP = [
  "h2. Events",
  "* EVENT_COMBAT_EVENT (*integer* _result_)",
  "* EVENT_PLAYER_DEAD",
  "h2. UI XML Layout",
].join("\n")

test("an event carries the parameters written beside it", () => {
  expect(parseEvents(EVENT_DUMP)).toEqual([
    { name: "EVENT_COMBAT_EVENT", params: [{ name: "result", type: "number" }] },
    { name: "EVENT_PLAYER_DEAD", params: [] },
  ])
})

const OBJECT_DUMP = [
  "h2. Object API",
  "h3. Control",
  "Objects that inherit behavior from Control",
  "[Button|#Button]",
  "* GetName()",
  "** _Returns:_ *string* _name_",
  "h3. Button",
  "h2. Events",
].join("\n")

test("a child object states the parent it inherits from", () => {
  const objects = parseObjects(OBJECT_DUMP)
  expect(objects.find((one) => one.name === "Button")?.inheritsFrom).toEqual(["Control"])
  expect(objects.find((one) => one.name === "Control")?.inheritsFrom).toEqual([])
})

test("a section the dump does not carry is read as nothing", () => {
  expect(parseFunctions("no headings here")).toEqual([])
  expect(parseEvents("no headings here")).toEqual([])
  expect(parseObjects("no headings here")).toEqual([])
})
