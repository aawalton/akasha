import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const woodworkingInfernoStaff = {
  id: "01a0616b-2ce1-700a-844b-c96ef8f46c08",
  type: "page-type/temper-research-line",
  slug: "woodworking-inferno-staff",
  title: "Inferno Staff",
  displayOrder: 2,
  parent: "temper-craft-type/woodworking",
  traits: "jsonl",
} as const satisfies TemperResearchLine
