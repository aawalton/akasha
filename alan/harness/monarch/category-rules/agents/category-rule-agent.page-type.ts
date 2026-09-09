import type { PageType } from "@akasha/pages/page-type"

export const categoryRuleAgent = {
  id: "01a0680c-3c00-7009-b845-2f7c9a1e310a",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "category-rule-agent",
  definition: "a category rule an agent carries out",
  pluralSlug: "category-rule-agents",
  extends: ["page-type/category-rule"],
  parts: ["text-property/judgement"],
  properties: [{ pageProperty: "text-property/judgement", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule of this kind narrows the rows and leaves the answer to a reader.",
    },
    {
      invariantKind: "departure",
      statement:
        "A handful of rows a year settled by hand is cheaper than a rule overruling the person who knows.",
    },
  ],
  types: "ts",
} as const satisfies PageType
