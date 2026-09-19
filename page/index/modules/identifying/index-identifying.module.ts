import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const indexIdentifying = {
  id: "01a0a55d-2c78-7d82-a849-3548cc1bb124",
  type: "page-type/module",
  slug: "index-identifying",
  definition: "the identifiers a page states, read once for every index filing them",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page's identifiers are the properties its own page type has stating a `unique`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An identifier's value is read from a page by the key its property states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An identifier's value is read as text or as a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating no id, no slug or no page type states no identifier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line has the page's path and its id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path in a line is relative to the repository root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A key is the index's own folder followed by the scope, the property and the value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value that is a lower uuid is filed under a folder its last two characters name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a value is filed under that folder and under the key without it as well.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Which index files an identifier is not answered here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "What a scope is made of is not answered here.",
    },
  ],
} as const satisfies Module
