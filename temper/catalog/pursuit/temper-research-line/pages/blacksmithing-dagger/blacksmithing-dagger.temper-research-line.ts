import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const blacksmithingDagger = {
  id: "01a0616b-2ce0-7006-90b3-aa319fcca252",
  type: "page-type/temper-research-line",
  slug: "blacksmithing-dagger",
  title: "Dagger",
  displayOrder: 7,
  parent: "temper-craft-type/blacksmithing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
