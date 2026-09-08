import { describe, expect, test } from "bun:test"
import {
  personaSlugCondition,
  relationshipLevelMatchCondition,
} from "./persona-page-conditions.module.code.ts"

describe("personaSlugCondition", () => {
  test("matches the persona by her slug", () => {
    expect(personaSlugCondition("aria")).toEqual({ key: "personaSlug", eq: "aria" })
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
