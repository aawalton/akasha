import type { Module } from "@akasha/code/module"

export const verifyRenderPlan = {
  id: "01a0691b-4f64-7cae-bd86-446992c33c41",
  pageTypeSlug: "module",
  type: "module",
  slug: "verify-render-plan",
  definition:
    "what a render check decides before it drives the browser, from the flags it was given",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A session is anonymous or throwaway or the real user.",
    },
    {
      invariantKind: "departure",
      statement: "Every sort of session names the environment that session needs.",
    },
    {
      invariantKind: "departure",
      statement: "A page that answered an error or landed on sign-in is not waited on to settle.",
    },
    {
      invariantKind: "departure",
      statement: "A hydration marker is waited on ahead of expected text.",
    },
    {
      invariantKind: "departure",
      statement: "Expected text is waited on ahead of a populated root.",
    },
    {
      invariantKind: "departure",
      statement:
        "A check with no discriminating signal is said to have no signal rather than passing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a browser.",
    },
  ],
} as const satisfies Module
