import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereViSp = {
  id: "01a0ea3d-ca8f-7b92-b15e-8f0b6ddafb10",
  type: "page-type/page-type",
  slug: "otherwhere-vi-sp",
  definition: "the SP, the stamina, a character in Otherwhere VI has left",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A person's SP maximum is fourteen, two for each Strength and Vitality, and two each level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each Tier a person's Class advances adds half again to that maximum.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour's steady walking spends two SP, three barefoot, in the dark or uphill.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sprint, a climb, a struggle or an exchange of blows spends one to three SP.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each cold hour spends one SP in shivering.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An active skill spends the SP its world-skill page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quarter hour sitting still gives back two SP, halved when hungry or cold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's sleep gives back all her SP, and a stamina potion twenty at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Below a quarter of her SP every bodily act costs her one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At nought SP she can only stagger, crawl or rest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in SP is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "SP shows as a number only where the System shows it; otherwise as tiredness.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
