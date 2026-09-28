import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereViMp = {
  id: "01a0ea3d-ca8f-7e7d-b381-ec85f26b807f",
  type: "page-type/page-type",
  slug: "otherwhere-vi-mp",
  definition: "the MP, the mana, a character in Otherwhere VI has left",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A person's MP maximum is a third of Intelligence and Willpower, and one each level past the first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each Tier a person's Class advances adds half again to that maximum.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "MP is spent only by skills and spells, as each one's world-skill page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "She cannot spend MP she lacks; pushing past nought costs two HP for each point short.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour gives back one MP, and standing on a leyline or in moonlight two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's sleep gives back all her MP, and a mana potion fifteen at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in MP is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "MP shows as a number only where the System shows it; otherwise as a buzz or a hollow.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
