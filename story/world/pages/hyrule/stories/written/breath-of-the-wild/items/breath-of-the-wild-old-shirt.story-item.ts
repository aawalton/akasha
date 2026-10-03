import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const breathOfTheWildOldShirt = {
  id: "01a10332-e99a-7dcf-bb82-56eeabbbb1bc",
  type: "page-type/story-item",
  slug: "breath-of-the-wild-old-shirt",
  title: "Old Shirt",
  story: "story-written/breath-of-the-wild",
  character: "character-other/breath-of-the-wild-link",
  description:
    "A thin, rough-woven shirt a hundred years old, faded to a blue so pale it is almost grey.",
} as const satisfies StoryItem
