import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const woodworkingBow = {
  id: "01a0616b-2ce1-7009-9575-d080f5c1fa56",
  type: "page-type/temper-research-line",
  slug: "woodworking-bow",
  title: "Bow",
  displayOrder: 1,
  parent: "temper-craft-type/woodworking",
  traits: "jsonl",
} as const satisfies TemperResearchLine
