import type { MonarchCategory } from "akasha/alan/harness/monarch/category/monarch-category.page-type.types.ts"

export const dividendsAndCapitalGains = {
  id: "01a06559-5ea8-7022-91fc-a1170aeaa879",
  type: "page-type/monarch-category",
  slug: "dividends-and-capital-gains",
  title: "Dividends & Capital Gains",
  definition: "money the family's investments paid out",
  monarchId: "251483394335971709",
  categoryGroup: "Income",
  categoryGroupType: "income",
} as const satisfies MonarchCategory
