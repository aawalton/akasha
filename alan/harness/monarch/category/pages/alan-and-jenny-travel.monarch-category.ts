import type { MonarchCategory } from "akasha/alan/harness/monarch/category/monarch-category.page-type.types.ts"

export const alanAndJennyTravel = {
  id: "01a06559-5ea8-7019-9fbc-dc4e6c4387b5",
  type: "page-type/monarch-category",
  slug: "alan-and-jenny-travel",
  title: "Alan & Jenny Travel",
  definition: "money Alan and Jenny spent travelling together",
  monarchId: "212166138609408137",
  categoryGroup: "Personal Spending",
  categoryGroupType: "expense",
} as const satisfies MonarchCategory
