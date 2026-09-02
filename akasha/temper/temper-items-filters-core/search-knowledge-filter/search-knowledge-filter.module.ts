import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchKnowledgeFilter = {
  id: "01a0613a-e0a9-7d8a-aa66-d1a77994500e",
  pageTypeSlug: "module",
  slug: "search-knowledge-filter",
  definition:
    "whether the recipe or motif an item teaches is learned, narrowed by a known or unknown toggle",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Unknown matches only an item the client marks as a knowledge item.",
    },
    {
      invariantKind: "departure",
      statement:
        "The knowledge filter reads item facts directly rather than through a rule-editor checker.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
