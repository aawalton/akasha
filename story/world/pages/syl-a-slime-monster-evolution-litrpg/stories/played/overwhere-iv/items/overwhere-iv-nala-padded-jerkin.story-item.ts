import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIvNalaPaddedJerkin = {
  id: "01a0f1bc-56c8-71de-82d1-ef2dbfc2cdb3",
  type: "page-type/story-item",
  slug: "overwhere-iv-nala-padded-jerkin",
  title: "Padded Jerkin",
  story: "story-played/overwhere-iv",
  character: "character-player/overwhere-iv-nala",
  slot: "item-slot/chest",
  description: "A stiff quilted jerkin of layered cloth that turns a glancing blow.",
} as const satisfies StoryItem
