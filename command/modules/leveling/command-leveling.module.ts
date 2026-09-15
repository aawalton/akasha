import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const commandLeveling = {
  id: "01a09474-4bf8-7c98-8646-9020174ecb0f",
  type: "module",
  slug: "command-leveling",
  definition: "the levels of the command tree, as the index carries what each level states",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level is a command page or a namespace page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page types the levels are read under are handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What a level states is read from what the index carries for that page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every level of those page types is read at once rather than one at a time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The levels of one checkout are read once and held for the rest of the run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A part names a level by that level's page type and that level's slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A part naming no level answers with none.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug more than one page of a page type carries answers with each of them.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level's name is the name its page states, or its slug where none is stated.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here loads a page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here joins words into a slug.",
    },
  ],
} as const satisfies Module
