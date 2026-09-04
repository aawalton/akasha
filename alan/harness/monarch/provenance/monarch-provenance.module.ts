import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchProvenance = {
  id: "01a0685f-4ed9-7719-bfc4-bcec345f8656",
  pageTypeSlug: "module",
  slug: "monarch-provenance",
  definition: "what is written down about who decided a transaction's category",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A decision records both the kind of thing that decided and the one thing that decided.",
    },
    {
      invariantKind: "departure",
      statement: "A decision naming nothing that decided is refused rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "A source is programmatic, semantic or manual and is nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "What is named is trimmed, so blank space names nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes; it composes what a writer writes.",
    },
  ],
} as const satisfies Module
