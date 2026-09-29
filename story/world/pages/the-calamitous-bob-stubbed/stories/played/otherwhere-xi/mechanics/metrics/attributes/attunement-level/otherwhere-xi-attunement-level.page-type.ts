import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereXiAttunementLevel = {
  id: "01a0ea80-e9af-7e70-9f69-938d065fc4ff",
  type: "page-type/page-type",
  slug: "otherwhere-xi-attunement-level",
  definition: "how far a character's body in Otherwhere XI has taken on mana, as a percent",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Attunement is kept as a percent to one decimal place, from nought to a hundred.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala came at 0.1 percent, her body barely touched by mana.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Attunement rises only as the growth check answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At one percent she first feels mana, and her status unlocks in the interface.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At three percent she can draw mana into her body and shape a first spell.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her status then shows it as a line such as Current attunement: 3.2%.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Attunement leans toward the colors she works; past thirty, one color alone wears the body down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Colorless work balances a lean, and slows that wearing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No attunement shows before her status unlocks, and then only in her status.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
