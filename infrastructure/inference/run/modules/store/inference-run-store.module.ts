import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inferenceRunStore = {
  id: "01a0685d-4b35-7014-819a-3402c8830118",
  type: "page-type/module",
  slug: "inference-run-store",
  definition: "a run carried through to the page of what the run made",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The failure a run throws is raised on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that throws lands no page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No run lands both an image page and an audio page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here keeps a run apart from the page of what the run made.",
    },
  ],
} as const satisfies Module
