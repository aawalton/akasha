import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchProvenance = {
  id: "01a0685f-4ed9-7719-bfc4-bcec345f8656",
  type: "page-type/module",
  slug: "monarch-provenance",
  definition: "what is written down about who decided a transaction's category",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A decision records both the kind of thing that decided and the one thing that decided.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A decision naming nothing that decided is refused rather than written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A source is programmatic or semantic or manual and is nothing else.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name is trimmed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Blank space names nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This module composes the record a writer writes.",
    },
  ],
} as const satisfies Module
