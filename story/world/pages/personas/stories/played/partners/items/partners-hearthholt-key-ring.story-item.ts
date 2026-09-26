import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const partnersHearthholtKeyRing = {
  id: "01a0de52-0bd6-731b-b23b-2619f07b2128",
  type: "page-type/story-item",
  slug: "partners-hearthholt-key-ring",
  title: "Hearthholt key-ring",
  story: "story-played/partners",
  character: "character-player/partners-alan",
  description: "An iron key-ring with five keys of five sizes and a brass tag reading HEARTHHOLT.",
} as const satisfies StoryItem
