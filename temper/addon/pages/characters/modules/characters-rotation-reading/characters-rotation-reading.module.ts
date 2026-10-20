import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersRotationReading = {
  id: "01a155ac-671b-7351-9a83-a21564b7fea3",
  type: "page-type/module",
  slug: "characters-rotation-reading",
  definition: "the character's toughness, damage and healing per second, worked out in the game",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The bar held is read from the game's stats now, and the other bar from its last kept reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The calculation is the rotation reading the tps command runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A bar's critical damage, critical healing, healing done and taken are the game's own numbers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Critical chance is the higher of weapon and spell critical, over the metric's divisor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bar's weapon style is read from the weapons worn for that bar now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Reaving Blows counts where it is slotted, at the share its text in the game names.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "Damage taken is the sum of each buff and boon whose text changes your damage taken by a percent.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "No healing received is counted, since the game gives no number for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bar read before the game's advanced stats were kept adds no multipliers.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "Each reading is kept on the character with each bar's multipliers, to set beside the catalog's.",
    },
  ],
  createdAt: "2026-10-19T19:38:44.378Z",
  updatedAt: "2026-10-20T00:13:13.759Z",
} as const satisfies Module
