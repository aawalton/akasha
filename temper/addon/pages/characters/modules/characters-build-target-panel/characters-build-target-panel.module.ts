import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersBuildTargetPanel = {
  id: "01a18414-31ea-751e-bea7-ad645881373e",
  type: "page-type/module",
  slug: "characters-build-target-panel",
  definition: "the panel showing the target build checklist",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel shows with the game's character screen, to the left of its stats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character with no target build shows no panel.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel is as tall and as wide as what it shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each section states how many of its lines are met, and lists only the lines unmet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One button applies the champion points and the attributes together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the game said to an apply is shown beside the button.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The checklist is read again a moment after an apply.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here slots skills or equips gear.",
    },
  ],
  createdAt: "2026-10-28T19:54:38.440Z",
  updatedAt: "2026-10-28T20:23:58.819Z",
} as const satisfies Module
