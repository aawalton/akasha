import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIHideFootWraps = {
  id: "01a0f1c0-467d-7070-90ac-3b213cca8cdc",
  type: "page-type/story-item",
  slug: "overwhere-i-hide-foot-wraps",
  title: "Hide Foot-Wraps",
  story: "story-played/overwhere-i",
  place: "place/overwhere-i-fenwatch",
  slot: "item-slot/feet",
  description: "Soft pieces of cured hide wrapped round the feet and tied on with thongs.",
} as const satisfies StoryItem
