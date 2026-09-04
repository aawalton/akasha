import type { Module } from "@akasha/code-system/module"

export const judging = {
  id: "01a04bc4-7e86-7fa6-8d9b-5532730b7daf",
  pageTypeSlug: "module",
  slug: "judging",
  definition: "the refusals a check answers with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing here imports a check or a command.",
    },
  ],
} as const satisfies Module
