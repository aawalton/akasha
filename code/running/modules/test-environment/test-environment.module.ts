import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const testEnvironment = {
  id: "01a0d978-1a03-7a19-8a9d-d73fee78e0a9",
  type: "page-type/module",
  slug: "test-environment",
  definition: "the variables a test run is handed out of the caller's environment",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A test run is handed only the variables named here, whatever the caller holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Those are the path, the home, the scratch folder and the language.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is here because a test needs it rather than because it is no secret.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name the caller does not hold is left out rather than handed empty.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No secret the caller's environment holds reaches a test.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The roots, the mark and the overlay lane's variables are added by the run.",
    },
  ],
} as const satisfies Module
