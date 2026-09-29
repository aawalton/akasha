import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIiiHealth = {
  id: "01a0ed27-2719-7941-8246-59dd5bc124ba",
  type: "page-type/page-type",
  slug: "overwhere-iii-health",
  definition: "the health a character in Overwhere III has left",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala's most health is 30 at Level 1, and three more for each level after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A townsman or a common beast has 8 to 15; a seasoned fighter 20 to 40.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A monster has about three times its level; a boss or a blighted guardian twice that.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Health falls only as the harm check answers, or as a working's strain costs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing in ordinary play takes Nala below 1 health.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only a foe far beyond her, faced after the game shows her so, can take her to nought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At 1 Nala is spent: out of the fight until she rests or is healed, and alive.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Anyone else at nought is down: dead if the foe meant it, else out of the fight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour's rest gives back three; a night's sleep gives back all of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A low potion gives back 10, a good one 25, and a pure one all of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The System names health as Unhurt, Scrapped, Wounded or Critical, by thirds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Health never shows as a number; the prose shows it as pain, blood and weariness.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
