import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const otherwhereIxGreyShirt = {
  id: "01a10348-b739-78c1-8d4f-bc026b739852",
  type: "page-type/story-item",
  slug: "otherwhere-ix-grey-shirt",
  title: "Dark Grey Shirt",
  story: "story-played/otherwhere-ix",
  character: "character-player/otherwhere-ix-nala",
  description:
    "Alan's loose dark grey shirt, hanging to Nala's mid-thigh, its collar slipping off one shoulder.",
} as const satisfies StoryItem
