import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const blacksmithingPauldron = {
  id: "01a0616b-2ce0-700c-bc93-3c695ca8a50f",
  type: "page-type/temper-research-line",
  slug: "blacksmithing-pauldron",
  title: "Pauldron",
  displayOrder: 13,
  parent: "temper-craft-type/blacksmithing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
