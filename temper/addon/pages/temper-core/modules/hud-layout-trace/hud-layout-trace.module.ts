import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudLayoutTrace = {
  id: "01a182d3-4b10-7910-b8f5-17c79f62d49c",
  type: "page-type/module",
  slug: "hud-layout-trace",
  definition: "the HUD layout's placings, refits and clicks kept for an agent to read",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The trace starts empty each time the add-on loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A click is kept with the control the mouse was over and where the mouse was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the latest twenty refits and twenty clicks are kept.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The trace is kept while the task list's clicks are looked into.",
    },
  ],
  createdAt: "2026-10-28T14:04:07.823Z",
  updatedAt: "2026-10-28T14:04:07.823Z",
} as const satisfies Module
