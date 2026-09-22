import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const clothingGuards = {
  id: "01a0616b-2ce1-7005-8ad8-a24a02504ec0",
  type: "page-type/temper-research-line",
  slug: "clothing-guards",
  title: "Guards",
  displayOrder: 12,
  parent: "temper-craft-type/clothing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
