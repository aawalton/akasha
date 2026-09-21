import type { TemperAntiquityCategory } from "akasha/temper/catalog/pursuit/temper-antiquity-category/temper-antiquity-category.page-type.types.ts"

export const northernElsweyr = {
  id: "01a06166-503d-700f-96e2-2b2032f54956",
  type: "page-type/temper-antiquity-category",
  slug: "northern-elsweyr",
  title: "Northern Elsweyr",
  esoAntiquityCategoryId: 35,
  antiquities: "jsonl",
} as const satisfies TemperAntiquityCategory
