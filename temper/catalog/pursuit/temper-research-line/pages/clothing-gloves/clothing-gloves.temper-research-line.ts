import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const clothingGloves = {
  id: "01a0616b-2ce0-7011-a9db-437f60ed8e50",
  type: "page-type/temper-research-line",
  slug: "clothing-gloves",
  title: "Gloves",
  displayOrder: 3,
  parent: "temper-craft-type/clothing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
