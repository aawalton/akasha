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
      statement: "The panel shows with the game's character and skills screens, left of the stats.",
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
      statement: "One button applies every part of the target the game lets an add-on change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The button names only the parts not yet met, and applies only those.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A target with every such part met shows no button.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The checklist is read again as worn gear or a bar slot changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What an apply said is shown under the button, a part to a line, wrapped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line is styled before its text is set, since the game cases text as it is set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The checklist is read again a moment after an apply.",
    },
  ],
  createdAt: "2026-10-28T19:54:38.440Z",
  updatedAt: "2026-10-28T21:18:16.543Z",
} as const satisfies Module
