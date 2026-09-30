import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiNalaAnnisCloak = {
  id: "01a0f1b7-8443-7770-9ca5-95fb08d9fa39",
  type: "page-type/story-item",
  slug: "overwhere-ii-nala-annis-cloak",
  title: "Anni's Cloak",
  story: "story-played/overwhere-ii",
  character: "character-player/overwhere-ii-nala",
  slot: "item-slot/shoulders",
  description: "A hooded cloak of heavy brown wool, patched at the hem and smelling of peat smoke.",
} as const satisfies StoryItem
