import type { Module } from "@akasha/code-system/module"

export const ciDispatchStepState = {
  id: "01a06861-24c9-7004-b4c9-01b229eb722a",
  pageTypeSlug: "module",
  slug: "ci-dispatch-step-state",
  definition: "the step and pipeline page writes a dispatch tick makes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A step is moved to launching or to failed only from dispatching.",
    },
  ],
} as const satisfies Module
