import type { Module } from "@akasha/code-system/module"

export const supervisorDecideRuleInputs = {
  id: "01a0683e-3dbe-7018-abd0-c37a4ad97b28",
  pageTypeSlug: "module",
  slug: "supervisor-decide-rule-inputs",
  definition: "the observations and states a supervisor rule is asked about",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A null state is read as the initial state rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "An optional field absent from the question stays absent in the reading.",
    },
  ],
} as const satisfies Module
