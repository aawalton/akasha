import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inferenceWatching = {
  id: "01a0d973-be39-74f3-add1-0acb74caf769",
  type: "page-type/module",
  slug: "inference-watching",
  definition: "the run leaving each inference service's page carrying whether that service is well",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every inference service whose verdict changed is left carrying this run's finding.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This run's own page is left carrying the moment this run looked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run says each verdict it wrote, and why a service it found broken is broken.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here tells a persona that an inference service is broken.",
    },
  ],
} as const satisfies Module
