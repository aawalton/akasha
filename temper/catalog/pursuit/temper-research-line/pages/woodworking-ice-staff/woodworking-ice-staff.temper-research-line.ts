import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const woodworkingIceStaff = {
  id: "01a0616b-2ce1-700b-9f45-9c5a34adbc6d",
  type: "page-type/temper-research-line",
  slug: "woodworking-ice-staff",
  title: "Ice Staff",
  displayOrder: 3,
  parent: "temper-craft-type/woodworking",
  traits: "jsonl",
} as const satisfies TemperResearchLine
