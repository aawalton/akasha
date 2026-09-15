import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const verifyRenderPlan = {
  id: "01a0691b-4f64-7cae-bd86-446992c33c41",
  type: "page-type/module",
  slug: "verify-render-plan",
  definition:
    "what a render check decides before it drives the browser, from the flags it was given",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A session is anonymous or throwaway or the real user.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every sort of session names the environment that session needs.",
    },
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
        "A check with no discriminating signal is said to have no signal rather than passing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens a browser.",
    },
  ],
} as const satisfies Module
