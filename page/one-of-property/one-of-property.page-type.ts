import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const oneOfProperty = {
  id: "01a062b2-e0ca-7409-b87f-b8122ca96d56",
  type: "page-type/page-type",
  slug: "one-of-property",
  definition: "a page property with a value one of its members has",
  parts: ["multi-relation-property/members"],
  extends: ["page-type/page-property"],
  properties: [
    {
      pageProperty: "multi-relation-property/members",
      required: true,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A member names a page property rather than a kind of value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A member declares its own target rather than the property declaring that member.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every member is tried at once rather than in the order the members are named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two members reaching one page reach that page once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value reaching two pages through two members is refused rather than resolved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property with a member that admits every value refuses nothing.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
