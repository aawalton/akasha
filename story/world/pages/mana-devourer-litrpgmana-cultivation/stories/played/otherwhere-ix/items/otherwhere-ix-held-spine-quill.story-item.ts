import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const otherwhereIxHeldSpineQuill = {
  id: "01a1034d-4dc0-70fc-bf7b-ccb17b24c103",
  type: "page-type/story-item",
  slug: "otherwhere-ix-held-spine-quill",
  title: "Spine Quill",
  story: "story-played/otherwhere-ix",
  character: "character-player/otherwhere-ix-nala",
  quantity: 1,
  description:
    "A whole shardback spine quill, a hand and a half long, held by its blunt root in Nala's left fist.",
} as const satisfies StoryItem
