import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const timePassing = {
  id: "01a0e9e1-aa5f-7d53-b9bb-61529eb4291d",
  type: "page-type/module",
  slug: "time-passing",
  definition: "when a played turn ends, and the day and light it ends in, on a story's own clock",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn ends at the end of the turn before plus the minutes passing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The day a story opens on is day one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each story names its own opening and the light at each hour of its day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Time never runs backward, and no turn passes more than a week.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every check settling time this way imports this rule rather than stating it again.",
    },
  ],
} as const satisfies Module
