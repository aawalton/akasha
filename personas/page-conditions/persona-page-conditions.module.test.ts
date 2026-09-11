import { describe, expect, test } from "bun:test"
import {
  personaCondition,
  relationshipLevelMatchCondition,
} from "akasha/personas/page-conditions/persona-page-conditions.module.code.ts"

describe("personaCondition", () => {
  test("matches the persona by her slug", () => {
    expect(personaCondition("aria")).toEqual({ key: "persona", eq: "aria" })
  })
})

describe("relationshipLevelMatchCondition", () => {
  test("matches a level stored as a number or as text", () => {
    expect(relationshipLevelMatchCondition(3)).toEqual({
      or: [
        { key: "relationshipLevel", eq: 3 },
        { key: "relationshipLevel", eq: "3" },
      ],
    })
  })
})
