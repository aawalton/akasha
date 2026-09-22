import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const jewelryCraftingNecklace = {
  id: "01a0616b-2ce1-7011-a0d5-eb01ff722779",
  type: "page-type/temper-research-line",
  slug: "jewelry-crafting-necklace",
  title: "Necklace",
  displayOrder: 2,
  parent: "temper-craft-type/jewelry-crafting",
  traits: "jsonl",
} as const satisfies TemperResearchLine
