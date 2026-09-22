import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const jewelryCraftingRing = {
  id: "01a0616b-2ce1-7010-8ff6-7a252a2d62fd",
  type: "page-type/temper-research-line",
  slug: "jewelry-crafting-ring",
  title: "Ring",
  displayOrder: 1,
  parent: "temper-craft-type/jewelry-crafting",
  traits: "jsonl",
} as const satisfies TemperResearchLine
