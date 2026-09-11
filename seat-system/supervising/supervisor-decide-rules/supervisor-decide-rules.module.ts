import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const supervisorDecideRules = {
  id: "01a0683e-3dbe-7019-8211-ebbf510abf12",
  pageTypeSlug: "module",
  type: "module",
  slug: "supervisor-decide-rules",
  definition: "every rule the deciding command answers",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A question naming nothing this answers is refused rather than answered empty.",
    },
    {
      invariantKind: "departure",
      statement: "A question asking nothing is refused rather than answered with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Every rule answers only the keys the question asked for.",
    },
  ],
} as const satisfies Module
