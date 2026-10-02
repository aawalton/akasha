import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const emberdeepFirstLevelMap = {
  id: "01a0fde6-9f89-712f-842f-4e9ae6aeeaff",
  type: "page-type/story-item",
  slug: "emberdeep-first-level-map",
  title: "First-Level Map",
  story: "story-written/emberdeep",
  character: "character-player/emberdeep-nala",
  description:
    "The guild's map of the Deep's first level on thin paper: corridors, chambers, stairs, and labels in a neat cramped hand. On its back Nala has drawn in chalk the second level from the foot of the Dry Stair to the Drowned Hall, with a cross marked LIZARD where the lizard came up.",
} as const satisfies StoryItem
