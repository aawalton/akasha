import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const proseReach = {
  id: "01a0823b-40b3-774c-873f-e2fb70d34da0",
  type: "page-type/module",
  slug: "prose-reach",
  definition: "the keys a page type states prose under, read off the properties it declares",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A property is prose by its page type rather than by the key it is stated under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property whose page type extends the prose page type is prose too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prose field of a record is reached under the key that record is stated under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record inside a record is walked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record naming itself is walked once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type reaches every prose the types above it state.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a page.",
    },
  ],
} as const satisfies Module
