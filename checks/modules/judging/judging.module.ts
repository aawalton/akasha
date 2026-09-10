import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const judging = {
  id: "01a04bc4-7e86-7fa6-8d9b-5532730b7daf",
  pageTypeSlug: "module",
  type: "module",
  slug: "judging",
  definition: "the refusals a check answers with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing here imports a check or a command.",
    },
    {
      invariantKind: "departure",
      statement: "A check is handed a change and the shadow that change reads through.",
    },
    {
      invariantKind: "departure",
      statement: "An audit is handed the root alone.",
    },
    {
      invariantKind: "departure",
      statement: "There is no change at audit.",
    },
    {
      invariantKind: "departure",
      statement: "The two answer the same refusals.",
    },
  ],
} as const satisfies Module
