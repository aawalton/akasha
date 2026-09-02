import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionSupportEvaluator = {
  id: "01a06152-c2d7-79f1-86ad-f183166c0a7e",
  pageTypeSlug: "module",
  slug: "companion-support-evaluator",
  definition: "assembly of the three support rotation metrics from a companion stats result",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The support damage metric is multiplied by four before it is returned.",
    },
    {
      invariantKind: "departure",
      statement: "The support score weighs toughness at one tenth of damage.",
    },
    {
      invariantKind: "gap",
      statement: "A stats result without a rotation yields no support metrics.",
    },
  ],
} as const satisfies Module
