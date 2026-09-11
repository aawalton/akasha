import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const sessionRelationships = {
  id: "01a08cad-1eca-7853-9c10-0a4d891fc3d8",
  type: "module",
  slug: "session-relationships",
  definition: "the relationships a stretch of one of Alan's days is tagged with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A relationship is named by its id or by the title its page has.",
    },
    {
      invariantKind: "departure",
      statement:
        "A relationship reading answers with the ids or with the reasons those ids were refused.",
    },
    {
      invariantKind: "departure",
      statement: "A title with an alias of a relationship tags the stretch with that relationship.",
    },
    {
      invariantKind: "departure",
      statement: "An alias more than one relationship has tags the stretch with no relationship.",
    },
    {
      invariantKind: "departure",
      statement: "A relationship a caller names is kept beside a relationship a title tagged.",
    },
    {
      invariantKind: "departure",
      statement: "A relationship is read from the index rather than from the text of its page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a file.",
    },
  ],
} as const satisfies Module
