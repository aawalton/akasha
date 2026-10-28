import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keybinderCaptureReading = {
  id: "01a1847d-4137-7bd8-83b6-ff276b198840",
  type: "page-type/module",
  slug: "keybinder-capture-reading",
  definition: "the keybindings a capture of the keybinder lands on the pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The capture is the keybinder's saved variables for the user profile.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key Alan rebound lands where it changed later than its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A captured action with no page lands as it is bound on the character captured.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A captured action with a page gives that page only the names it lacks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A shared action with neither a page nor a capture lands at the instant handed in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page is taken away by a landing.",
    },
  ],
  createdAt: "2026-10-28T21:49:23.639Z",
  updatedAt: "2026-10-28T21:49:23.639Z",
} as const satisfies Module
