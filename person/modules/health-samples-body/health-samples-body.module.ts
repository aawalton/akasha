import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const healthSamplesBody = {
  id: "01a05b54-a90a-7911-bee0-2578b8352aa6",
  type: "page-type/module",
  slug: "health-samples-body",
  definition: "the body the health samples route takes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sample naming a metric this system does not keep is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sample stating a unit that is not its metric's own is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sample that ends before that sample starts is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body with no sample is refused.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "One body has a thousand samples at the most.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a sample down.",
    },
  ],
} as const satisfies Module
