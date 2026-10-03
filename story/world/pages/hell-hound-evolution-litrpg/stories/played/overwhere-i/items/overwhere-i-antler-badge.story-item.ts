import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIAntlerBadge = {
  id: "01a0ff3c-5440-7ba8-b296-c615ce496348",
  type: "page-type/story-item",
  slug: "overwhere-i-antler-badge",
  title: "Bronze Antler Badge",
  story: "story-played/overwhere-i",
  character: "character-player/overwhere-i-nala",
  description:
    "A small bronze antler badge from Antler Hall, the mark of a hunter on Wendlow's roll.",
} as const satisfies StoryItem
