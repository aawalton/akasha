import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const landingReworking = {
  id: "01a0d466-73fd-7022-a9bf-ab1c9535e9e1",
  type: "page-type/module",
  slug: "landing-reworking",
  definition:
    "a change refused only over bodies a machine generates, worked out again against HEAD and landed",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path holding an agent's edit that moved since the first commit read refuses the change unwritten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every landing again runs every check over the bodies worked out again.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing holds the lock between one landing and the next.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal of any other kind is answered as the landing answered it.",
    },
  ],
} as const satisfies Module
