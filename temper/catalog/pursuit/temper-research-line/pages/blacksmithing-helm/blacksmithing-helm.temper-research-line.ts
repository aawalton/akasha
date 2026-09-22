import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const blacksmithingHelm = {
  id: "01a0616b-2ce0-700a-b278-b8242fb15337",
  type: "page-type/temper-research-line",
  slug: "blacksmithing-helm",
  title: "Helm",
  displayOrder: 11,
  parent: "temper-craft-type/blacksmithing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
