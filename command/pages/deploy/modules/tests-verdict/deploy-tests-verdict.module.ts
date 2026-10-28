import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployTestsVerdict = {
  id: "01a183b3-a961-7b16-b2e9-b3a9a20d2761",
  type: "page-type/module",
  slug: "deploy-tests-verdict",
  definition: "the verdict of the tests a deploy takes from the audit service",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy takes whether the tests pass from the audit's verdict for its commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That verdict is asked for as an audit naming only that check asks for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every deploy at one commit is answered by one round of the audit service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A verdict made at a later commit holding this one answers for this one too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A verdict that never came back refuses the deploy rather than passing it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A round that could not run the tests refuses the deploy the same way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A refusal in the verdict refuses a deploy only where the deploy's own judging would run that test.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Those are the tests beside the files the deploy judges, and every test reaching one of those files.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which tests those are is worked out only where the verdict refuses something.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal over what a test file cost refuses no deploy, as at judging.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy run in the cluster asks for no round.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The workstation sending that run asks, and hands the verdict to the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run handed no verdict for its commit refuses rather than judging the tests itself.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No deploy runs a test.",
    },
  ],
  createdAt: "2026-10-28T18:09:12.032Z",
  updatedAt: "2026-10-28T18:09:12.032Z",
} as const satisfies Module
