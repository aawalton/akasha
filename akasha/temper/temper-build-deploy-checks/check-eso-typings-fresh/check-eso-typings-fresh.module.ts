import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const checkEsoTypingsFresh = {
  id: "01a06297-7f6a-7fd6-9fbb-6cb8003a350c",
  pageTypeSlug: "module",
  slug: "check-eso-typings-fresh",
  definition: "the run judging whether every clone-derived ESO artifact is stamped",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The population this run states is the generated files searched.",
    },
    {
      invariantKind: "constraint",
      statement: "The artifacts judged are the subset of those files carrying a provenance line.",
    },
    {
      invariantKind: "constraint",
      statement: "Whether a stamp has fallen behind the ESO API itself is not asked here.",
    },
  ],
} as const satisfies Module
