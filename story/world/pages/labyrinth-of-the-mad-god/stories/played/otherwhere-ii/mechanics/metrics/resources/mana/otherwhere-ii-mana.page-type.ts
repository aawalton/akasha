import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereIiMana = {
  id: "01a0e997-8e7f-7a0d-a98d-71a48d6877ac",
  type: "page-type/page-type",
  slug: "otherwhere-ii-mana",
  definition: "the mana a character in Otherwhere has left in their core",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A person's most mana is three times their Magic.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spell spends the mana its page states, whether it works or not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No one spends mana they lack; an empty core leaves a dull ache below the heart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Mana comes back as many an hour as half the character's Magic, and whole with sleep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in mana is written on the page and a line of its history before the turn moves on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
