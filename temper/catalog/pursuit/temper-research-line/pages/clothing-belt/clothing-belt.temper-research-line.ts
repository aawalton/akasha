import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const clothingBelt = {
  id: "01a0616b-2ce1-7007-a7f9-3512ad5975dd",
  type: "page-type/temper-research-line",
  slug: "clothing-belt",
  title: "Belt",
  displayOrder: 14,
  parent: "temper-craft-type/clothing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
