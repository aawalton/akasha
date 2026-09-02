import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionMeasured = {
  id: "01a06108-2ff2-74de-bd0e-f2cc1d348cce",
  pageTypeSlug: "module",
  slug: "completion-measured",
  definition: "whether a character, an account or a companion has been read at all",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character carrying only roster fields counts as unread.",
    },
  ],
} as const satisfies Module
