import type { Module } from "@akasha/code-system/module"

export const complexityRows = {
  id: "01a0680f-d1b7-76ad-870a-daf5928ec28b",
  pageTypeSlug: "module",
  slug: "complexity-rows",
  definition: "one row per function or per file holding what that one measured",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file that will not open is passed over rather than counted.",
    },
    {
      invariantKind: "departure",
      statement: "A row names its file relative to the checkout root.",
    },
    {
      invariantKind: "departure",
      statement: "A caller naming one file measures that file rather than the checkout.",
    },
  ],
} as const satisfies Module
