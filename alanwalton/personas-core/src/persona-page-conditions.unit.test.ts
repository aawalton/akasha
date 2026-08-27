import { describe, expect, test } from "bun:test"
import { personaSlugCondition, relationshipLevelMatchCondition } from "./persona-page-conditions"

describe("personaSlugCondition", () => {
  test("names the slug field a file page carries, in the camelCase getPages answers with", () => {
    expect(personaSlugCondition("aine")).toEqual({ key: "personaSlug", eq: "aine" })
  })
})

describe("relationshipLevelMatchCondition", () => {
  test("tolerates the level held as a number or as a string", () => {
    expect(relationshipLevelMatchCondition(2)).toEqual({
      or: [
        { key: "relationshipLevel", eq: 2 },
        { key: "relationshipLevel", eq: "2" },
      ],
    })
  })
})
