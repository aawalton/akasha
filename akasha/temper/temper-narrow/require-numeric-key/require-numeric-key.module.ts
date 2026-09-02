import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const requireNumericKey = {
  id: "01a060b6-99a2-762f-9fd9-585495c025f4",
  pageTypeSlug: "module",
  slug: "require-numeric-key",
  definition: "a Lua table key read back as the number the key was written from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A Lua table hands every key over as text.",
    },
    {
      invariantKind: "departure",
      statement: "A key that is no number is refused rather than given back as zero.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the key and the label the caller handed in.",
    },
  ],
} as const satisfies Module
