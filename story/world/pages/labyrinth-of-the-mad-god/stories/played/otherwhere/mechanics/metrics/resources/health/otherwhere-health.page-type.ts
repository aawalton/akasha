import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereHealth = {
  id: "01a0e995-0df8-7864-9cc2-53d97c66ca65",
  type: "page-type/page-type",
  slug: "otherwhere-health",
  definition: "the health a character in Otherwhere has left",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A person's most health is ten and twice their Toughness.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beast's most health is set when it is filed, by its size and level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beast's size gives three health if tiny, eight if small, sixteen if man-sized.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A large beast's size gives thirty health, and a huge one's sixty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beast has three more health for each of its levels.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "At nought health a character is down: senseless, and at the mercy of what is near.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character down with a foe near and no help dies.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Health comes back one an hour at rest with water, and a quarter with a night's sleep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wound left dirty festers, and a festering wound heals nothing until cleaned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in health is written on the page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Health shows in the prose as the body feels it, never as a number.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
