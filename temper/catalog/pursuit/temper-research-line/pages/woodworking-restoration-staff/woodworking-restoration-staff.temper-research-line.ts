import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const woodworkingRestorationStaff = {
  id: "01a0616b-2ce1-700d-bb8d-f69192e66c1b",
  type: "page-type/temper-research-line",
  slug: "woodworking-restoration-staff",
  title: "Restoration Staff",
  displayOrder: 5,
  parent: "temper-craft-type/woodworking",
  traits: "jsonl",
} as const satisfies TemperResearchLine
