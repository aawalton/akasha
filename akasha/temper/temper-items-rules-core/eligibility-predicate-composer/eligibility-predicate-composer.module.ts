import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const eligibilityPredicateComposer = {
  id: "01a06100-3beb-7c1f-82cd-d52265a07bd5",
  pageTypeSlug: "module",
  slug: "eligibility-predicate-composer",
  definition:
    "one test of whether a character suits a rule, made from every character condition it carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character failing one condition fails the whole test.",
    },
    {
      invariantKind: "departure",
      statement: "A condition whose reader the context lacks is passed over.",
    },
  ],
} as const satisfies Module
