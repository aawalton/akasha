import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereXiMana = {
  id: "01a0ea7b-4aea-7619-baea-c77a968ec72c",
  type: "page-type/page-type",
  slug: "otherwhere-xi-mana",
  definition: "the mana a character in Otherwhere XI holds, ready to spend",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Her most mana is her Focus times her attunement percent, divided by five, rounded down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Below one percent attunement she holds no mana and cannot feel it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her most mana is worked again whenever her Focus or her attunement changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Spells, circles and skills spend mana as the mana-flow check says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour of rest gives back a tenth of her most mana; a night's sleep all of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour in a meditative trance gives back three tenths.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mana-thick place such as the Singing Caves doubles what rest gives back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prayer at a shrine draws one mana, and brings a felt warmth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Emptied, she aches behind the eyes and every mental act costs one for an hour.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "She cannot spend mana she does not hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in mana is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Mana never shows as a number; she feels it as fullness or emptiness.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
