import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const indexIdentifying = {
  id: "01a0a55d-2c78-7d82-a849-3548cc1bb124",
  type: "module",
  slug: "index-identifying",
  definition: "the identifiers a page states, read once for every index filing them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page's identifiers are the properties its own page type has stating a `unique`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An identifier's value is read from a page by the key its property states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An identifier's value is read as text or as a number.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page stating no id, no slug or no page type states no identifier.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line has the page's path and its id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path in a line is relative to the repository root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A key is the index's own folder followed by the scope, the property and the value.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Which index files an identifier is not answered here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "What a scope is made of is not answered here.",
    },
  ],
} as const satisfies Module
