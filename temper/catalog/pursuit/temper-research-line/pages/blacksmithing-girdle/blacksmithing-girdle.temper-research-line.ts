import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const blacksmithingGirdle = {
  id: "01a0616b-2ce0-700d-9456-dc6440bb217c",
  type: "page-type/temper-research-line",
  slug: "blacksmithing-girdle",
  title: "Girdle",
  displayOrder: 14,
  parent: "temper-craft-type/blacksmithing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
