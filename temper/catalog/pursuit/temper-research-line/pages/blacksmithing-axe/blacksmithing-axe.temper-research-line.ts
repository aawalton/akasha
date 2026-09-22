import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const blacksmithingAxe = {
  id: "01a0616b-2ce0-7000-b957-13b5ed1d061f",
  type: "page-type/temper-research-line",
  slug: "blacksmithing-axe",
  title: "Axe",
  displayOrder: 1,
  parent: "temper-craft-type/blacksmithing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
