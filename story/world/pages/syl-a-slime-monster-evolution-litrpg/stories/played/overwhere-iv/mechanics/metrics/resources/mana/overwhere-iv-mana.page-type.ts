import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIvMana = {
  id: "01a0ed21-fffe-716e-8f94-d542172bbff4",
  type: "page-type/page-type",
  slug: "overwhere-iv-mana",
  definition: "the mana a character in Overwhere IV holds, ready to spend",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nala's most mana is 40, five more per racial level past the first, three per Dimension Magic level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spell spends the mana cost its skill page states, once each time it is cast.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spell held open spends its cost again for each span its duration states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour of rest gives back a fifth of her most mana; a night's sleep all of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Emptied, she aches behind the eyes, and her acts take minus two for an hour.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "She cannot spend mana she does not hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Mana never shows as a number; she feels it as warmth running full or thin.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
