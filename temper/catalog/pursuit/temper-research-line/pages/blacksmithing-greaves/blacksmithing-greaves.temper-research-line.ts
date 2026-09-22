import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const blacksmithingGreaves = {
  id: "01a0616b-2ce0-700b-854e-ed58ce247fe3",
  type: "page-type/temper-research-line",
  slug: "blacksmithing-greaves",
  title: "Greaves",
  displayOrder: 12,
  parent: "temper-craft-type/blacksmithing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
