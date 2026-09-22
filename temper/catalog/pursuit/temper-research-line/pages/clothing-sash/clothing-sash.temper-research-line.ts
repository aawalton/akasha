import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const clothingSash = {
  id: "01a0616b-2ce1-7000-ab6f-1785dc306baa",
  type: "page-type/temper-research-line",
  slug: "clothing-sash",
  title: "Sash",
  displayOrder: 7,
  parent: "temper-craft-type/clothing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
