import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveWrightPuzzleBox = {
  id: "01a0e9fc-0701-7ef4-adb6-fa7b93222ac3",
  type: "page-type/world-item",
  slug: "super-supportive-wright-puzzle-box",
  title: "Wrightwork puzzle box",
  world: "world/super-supportive",
  description: "An enchanted puzzle box that opens only for its owner.",
} as const satisfies WorldItem
