import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const woodworkingLightningStaff = {
  id: "01a0616b-2ce1-700c-ab48-5bae0587b34f",
  type: "page-type/temper-research-line",
  slug: "woodworking-lightning-staff",
  title: "Lightning Staff",
  displayOrder: 4,
  parent: "temper-craft-type/woodworking",
  traits: "jsonl",
} as const satisfies TemperResearchLine
