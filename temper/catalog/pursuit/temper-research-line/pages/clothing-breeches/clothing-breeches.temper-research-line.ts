import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const clothingBreeches = {
  id: "01a0616b-2ce0-7013-b8e9-4a3a641aa512",
  type: "page-type/temper-research-line",
  slug: "clothing-breeches",
  title: "Breeches",
  displayOrder: 5,
  parent: "temper-craft-type/clothing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
