import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const blacksmithingGauntlets = {
  id: "01a0616b-2ce0-7009-bcbd-3154a6382fcd",
  type: "page-type/temper-research-line",
  slug: "blacksmithing-gauntlets",
  title: "Gauntlets",
  displayOrder: 10,
  parent: "temper-craft-type/blacksmithing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
