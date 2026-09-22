import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const clothingBoots = {
  id: "01a0616b-2ce1-7002-8475-c609321fbdd8",
  type: "page-type/temper-research-line",
  slug: "clothing-boots",
  title: "Boots",
  displayOrder: 9,
  parent: "temper-craft-type/clothing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
