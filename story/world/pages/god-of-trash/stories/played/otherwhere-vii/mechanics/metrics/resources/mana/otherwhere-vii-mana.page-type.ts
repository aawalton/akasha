import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereViiMana = {
  id: "01a0ea36-990a-7a11-8d05-d6cf476c6071",
  type: "page-type/page-type",
  slug: "otherwhere-vii-mana",
  definition: "the mana a character in Otherwhere VII holds in the core to spend",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One who has never awakened holds no mana, and the most is nought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The most a core holds is five for every step of cultivation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An hour of gathering gives back a fifth of the most, and a night's rest all of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Gathering in the wilds, where mana is thick, gives back twice as much.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drop of mana potion gives back ten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Circulating mana for a bonus of one on an act of strength or speed spends two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A technique or spell spends the mana its world-skill page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Mana past the most brings mana-sickness: a fever costing one on every act.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Mana past twice the most cracks the core and harms as a crushing blow with no ward.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "No mana shows as a number; it shows as warmth, fullness or a hollow in the belly.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
