import type { PageType } from "@akasha/pages-system/page-type"
import type { CategoryRule } from "../category-rule.page-type.ts"
import type { Judgement } from "./properties/judgement.text-property.ts"

export type CategoryRuleAgent = CategoryRule & {
  judgement: Judgement
}

export const categoryRuleAgent = {
  id: "01a0680c-3c00-7009-b845-2f7c9a1e310a",
  pageTypeSlug: "page-type",
  slug: "category-rule-agent",
  definition: "a category rule an agent carries out",
  pluralSlug: "category-rule-agents",
  extendsSlug: "page-type/category-rule",
  partSlugs: ["text-property/judgement"],
  properties: [{ pagePropertySlug: "judgement", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule of this kind narrows the rows and leaves the answer to a reader.",
    },
    {
      invariantKind: "departure",
      statement:
        "A handful of rows a year settled by hand costs less than a rule overruling the person who knows.",
    },
  ],
} as const satisfies PageType
