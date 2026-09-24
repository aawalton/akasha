import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const urlProperty = {
  id: "01a063de-2c60-7000-97f0-b6451df11654",
  type: "page-type/page-type",
  slug: "url-property",
  definition: "a page property with a web address",
  icon: "link",
  extends: ["page-type/page-property"],
  properties: [{ pageProperty: "number-property/max-length", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A web address has the scheme the address is reached over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A web address is followed rather than read.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
