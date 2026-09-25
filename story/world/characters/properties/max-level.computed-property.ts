import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const maxLevel = {
  id: "01a0657a-9ccc-799d-b3da-5f74e280345a",
  type: "page-type/computed-property",
  slug: "max-level",
  propertySlug: "max-level",
  definition: "the highest level a story ever gives a character",
  holds: "number",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The highest level is the level the text states rather than the number a tally reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The highest level is the highest value among the character's own level claims.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only a level the story asserts counts, and a level a character says is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level a character says can be a boast, a guess or a lie.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level claim whose value is no number is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character the text never levels has no highest level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character's own claims are the ones beside that character rather than an alias's.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A character reached from another page carries its claims unread, and no highest level.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a level.",
    },
  ],
  types: "ts",
} as const satisfies ComputedProperty
