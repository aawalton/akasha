import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereXiStat = {
  id: "01a0ea7b-4ae8-7660-a5b5-a0cd12a40d57",
  type: "page-type/page-type",
  slug: "otherwhere-xi-stat",
  definition: "one of the six stats the interface keeps for a character in Otherwhere XI",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's slug ends in the stat it keeps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The six stats are Power, Finesse, Endurance, Focus, Acuity and Willpower.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Power, Finesse and Endurance are the physical stats; the other three the mental.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Power also sets how hard her spells hit and how far from her body she can cast.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Focus, Acuity and Willpower set how much mana she holds and how well she casts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An untrained adult sits from 8 to 15, a trained soldier in the twenties, a fourth-stepper past 30.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each ten is a tier; about 45 is the upper limit of a human.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each multiple of ten reached is a milestone, with the gift the growth check names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat rises only as the growth check answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The interface shows a rise as a line such as [Focus +1] as it happens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No stat shows as a number save where her status or the interface shows it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
