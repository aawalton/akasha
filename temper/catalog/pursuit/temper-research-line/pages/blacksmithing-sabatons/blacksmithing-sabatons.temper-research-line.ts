import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const blacksmithingSabatons = {
  id: "01a0616b-2ce0-7008-81c7-b4c115f4c50b",
  type: "page-type/temper-research-line",
  slug: "blacksmithing-sabatons",
  title: "Sabatons",
  displayOrder: 9,
  parent: "temper-craft-type/blacksmithing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
