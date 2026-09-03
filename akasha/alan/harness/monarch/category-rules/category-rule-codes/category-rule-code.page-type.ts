import type { PageType } from "@akasha/pages-system/page-type"
import type { CategoryRule } from "../category-rule.page-type.ts"

export type CategoryRuleCode = CategoryRule

export const categoryRuleCode = {
  id: "01a0680c-3c00-7008-9c73-6a2e5d8b3109",
  pageTypeSlug: "page-type",
  slug: "category-rule-code",
  definition: "a category rule its clauses alone carry out",
  pluralSlug: "category-rule-codes",
  extendsSlug: "page-type/category-rule",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule of this kind is settled by its clauses without anybody reading the row.",
    },
    {
      invariantKind: "departure",
      statement: "A rule of this kind naming no category catches a row for a person to settle.",
    },
  ],
} as const satisfies PageType
