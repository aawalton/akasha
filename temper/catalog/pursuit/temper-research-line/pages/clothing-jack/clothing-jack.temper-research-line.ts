import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const clothingJack = {
  id: "01a0616b-2ce1-7001-81df-375b9edaadf5",
  type: "page-type/temper-research-line",
  slug: "clothing-jack",
  title: "Jack",
  displayOrder: 8,
  parent: "temper-craft-type/clothing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
