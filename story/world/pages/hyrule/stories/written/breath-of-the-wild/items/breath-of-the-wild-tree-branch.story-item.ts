import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const breathOfTheWildTreeBranch = {
  id: "01a10332-e99a-7c7e-adb5-6a29a611f7e0",
  type: "page-type/story-item",
  slug: "breath-of-the-wild-tree-branch",
  title: "Tree Branch",
  story: "story-written/breath-of-the-wild",
  description:
    "A fallen limb as thick as a forearm, light and dry, one end broken to a rough point.",
} as const satisfies StoryItem
