import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIiiReputation = {
  id: "01a0ed2d-fe9f-768f-a28a-53d7aede6319",
  type: "page-type/page-type",
  slug: "overwhere-iii-reputation",
  definition: "how the people of one place in Overwhere III think of one character",
  pluralSlug: "reputations",
  extends: ["page-type/world-reputation"],
  parts: [
    "relation-property/overwhere-iii-reputation-character",
    "relation-property/overwhere-iii-reputation-place",
    "number-property/overwhere-iii-reputation-renown",
  ],
  properties: [
    {
      pageProperty: "relation-property/overwhere-iii-reputation-character",
      required: true,
      many: false,
    },
    {
      pageProperty: "relation-property/overwhere-iii-reputation-place",
      required: true,
      many: false,
    },
    {
      pageProperty: "number-property/overwhere-iii-reputation-renown",
      required: true,
      many: false,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A place's people start at nought toward a stranger.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Under minus 20 she is feared; under 10 a stranger; from 10 known; 30 trusted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "From 60 she is the place's hero, and from 90 its legend.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A kindness the place hears of gives two; a life saved five; the place saved twenty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beast or blight ended where the place can see it gives five.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Harm to its folk costs ten; frightening them with power costs three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "From 30 in any Wrenmark place, word reaches Thornmere and the Iron Law inspector.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place's reputation page is filed the first time its people take notice of her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every change is written on its page before the turn moves on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
