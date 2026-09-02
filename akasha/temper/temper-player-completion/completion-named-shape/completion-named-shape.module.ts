import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionNamedShape = {
  id: "01a06130-9e3a-7f50-9d58-465202494493",
  pageTypeSlug: "module",
  slug: "completion-named-shape",
  definition: "whether a stored completion value is the fuller shape carrying a name",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The caller states which shape a value carrying a name is.",
    },
    {
      invariantKind: "constraint",
      statement: "A completion record is stored in a fuller shape or in a terser one.",
    },
  ],
} as const satisfies Module
