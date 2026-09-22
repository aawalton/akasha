import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const blacksmithingMaul = {
  id: "01a0616b-2ce0-7004-a879-94942250deae",
  type: "page-type/temper-research-line",
  slug: "blacksmithing-maul",
  title: "Maul",
  displayOrder: 5,
  parent: "temper-craft-type/blacksmithing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
