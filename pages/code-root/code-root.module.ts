import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const codeRoot = {
  id: "01a0616e-00e1-7000-83c1-f6c571f34b8f",
  type: "module",
  slug: "code-root",
  definition: "the checkout a run walks",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A checkout named in `CODE_ROOT` answers before akasha's own root.",
    },
    {
      invariantKind: "departure",
      statement:
        "A `CODE_ROOT` naming a directory absent from disk is disregarded rather than honoured.",
    },
    {
      invariantKind: "departure",
      statement: "Walking a tree that is not there reports every check over that tree clean.",
    },
    {
      invariantKind: "stopgap",
      statement: "The `code` repository is now part of akasha.",
    },
  ],
  answersACheckoutRoot: true,
} as const satisfies Module
