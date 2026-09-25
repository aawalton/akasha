import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const verifyRenderPlan = {
  id: "01a0691b-4f64-7cae-bd86-446992c33c41",
  type: "page-type/module",
  slug: "verify-render-plan",
  definition:
    "what a render check decides before it drives the browser, from the flags it was given",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page that answered an error or landed on sign-in is not waited on to settle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hydration marker is waited on ahead of expected text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Expected text is waited on ahead of a populated root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A root is populated once it holds text and no skeleton is drawn anywhere under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skeleton outside the root is not waited on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A check with no discriminating signal is said to have no signal rather than passing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens a browser.",
    },
  ],
} as const satisfies Module
