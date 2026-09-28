import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereIiStamina = {
  id: "01a0e997-8e81-72d5-9faa-e21744e00391",
  type: "page-type/page-type",
  slug: "otherwhere-ii-stamina",
  definition: "the stamina a character in Otherwhere has left",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A person's most stamina is five and their Strength, Dexterity and Toughness.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A hard sprint, climb, swim or fight costs two stamina a turn, and a long walk one an hour.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At nought stamina every act takes a named bonus of minus three until she rests.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Stamina comes back four an hour at rest, faster with food and water, and whole with sleep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A combat art spends stamina as its page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in stamina is written on the page and a line of its history before the turn moves on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
