import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const breathOfTheWildSheikahSlate = {
  id: "01a10332-e99a-7c7a-88bf-b7612a5f5531",
  type: "page-type/story-item",
  slug: "breath-of-the-wild-sheikah-slate",
  title: "Sheikah Slate",
  story: "story-written/breath-of-the-wild",
  character: "character-other/breath-of-the-wild-link",
  description:
    "A smooth, dark, warm Sheikah tablet that fits Link's palm, its screen marked with an eye.",
} as const satisfies StoryItem
