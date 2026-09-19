import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stepping = {
  id: "01a0ba6c-ee3c-7e54-a879-6045758db635",
  type: "page-type/module",
  slug: "stepping",
  definition: "the one thing Alan does next, read off the warmup and the work in front of him",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Alan is answered with one step rather than with the session that step belongs to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session is raised, then mobilised, then ramped, then worked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The step Alan is on is the first of those the day does not hold already.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A step names one movement and what to do with it, for a time or for a load.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No step names the step that follows it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A raise with no movement to name is said as the minutes it runs.",
    },
  ],
} as const satisfies Module
