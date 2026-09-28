import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereViStat = {
  id: "01a0ea43-fec6-77a9-8d00-b0d1be83f00c",
  type: "page-type/page-type",
  slug: "otherwhere-vi-stat",
  definition: "one number the System keeps for a character in Otherwhere VI",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page's slug ends in the number it keeps: level, growth, or one of the seven stats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The seven stats are Strength, Dexterity, Vitality, Intelligence, Willpower, Charisma, Luck.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Growth is her progress toward the next level, as the growth check answers it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level page's maximum is the cap of her Tier: 10, 25, 50, then 100.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat rises one for each level point given it, as the growth check says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stat also rises one for a week's hard training at what it measures, or a hard insight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Surviving a poison that took a fifth of her HP raises Vitality one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Charisma rises only from kindness truly returned; Luck only from a near death survived.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The System shows a stat's rise as a line such as 【Vitality +1】 as it happens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No stat shows as a number save where her status or the System shows it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
