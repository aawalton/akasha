import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const clothingBracers = {
  id: "01a0616b-2ce1-7003-8ab7-7f94f4362ca6",
  type: "page-type/temper-research-line",
  slug: "clothing-bracers",
  title: "Bracers",
  displayOrder: 10,
  parent: "temper-craft-type/clothing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
