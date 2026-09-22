import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const blacksmithingSword = {
  id: "01a0616b-2ce0-7002-ad55-6ff9fafd7c7b",
  type: "page-type/temper-research-line",
  slug: "blacksmithing-sword",
  title: "Sword",
  displayOrder: 3,
  parent: "temper-craft-type/blacksmithing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
