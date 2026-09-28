import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereIvPurse = {
  id: "01a0e9f3-1922-78de-a215-d8c14dc07dbd",
  type: "page-type/page-type",
  slug: "otherwhere-iv-purse",
  definition: "the money a character in Otherwhere IV carries, counted in copper coins",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A purse is counted in copper coins.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A string of copper coins holds a hundred, and a silver tael is worth a thousand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Spirit stones pass among cultivators and are not counted in a purse.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A price is the lore's market price, and bargaining for less is an action check.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in money is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No sum shows as a number unless coins are counted in the scene.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
