import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const blacksmithingMace = {
  id: "01a0616b-2ce0-7001-9f73-504670347adf",
  type: "page-type/temper-research-line",
  slug: "blacksmithing-mace",
  title: "Mace",
  displayOrder: 2,
  parent: "temper-craft-type/blacksmithing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
