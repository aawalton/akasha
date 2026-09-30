import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiiNalaDeadJackalope = {
  id: "01a0f201-592a-735d-81c4-083f6163ebea",
  type: "page-type/story-item",
  slug: "overwhere-iii-nala-dead-jackalope",
  title: "Dead Antlered Rabbits",
  story: "story-played/overwhere-iii",
  character: "character-player/overwhere-iii-nala",
  quantity: 3,
  description:
    "Antlered rabbits she killed in the Wrenwood, carried by the hind legs. The two fresh ones still hold their glimmerstones.",
} as const satisfies StoryItem
