import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const landingChangeComposing = {
  id: "01a08e4b-4473-76f8-a0ab-a6f11802d8b6",
  type: "module",
  slug: "landing-change-composing",
  definition: "the change a set of file changes makes against the repository",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row's body is worked out from the row rather than handed in beside it.",
    },
    {
      invariantKind: "departure",
      statement: "A row appending is weighed against the body its path already holds.",
    },
    {
      invariantKind: "departure",
      statement: "A path many rows name is left one body.",
    },
    {
      invariantKind: "departure",
      statement: "A move is held apart from the rows leaving a body.",
    },
    {
      invariantKind: "departure",
      statement: "A row bringing a body in takes that body off the tree as bytes.",
    },
    {
      invariantKind: "departure",
      statement: "Those bytes are never read as text.",
    },
    {
      invariantKind: "departure",
      statement: "A body no row names is read from the base commit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a file or commits.",
    },
  ],
} as const satisfies Module
