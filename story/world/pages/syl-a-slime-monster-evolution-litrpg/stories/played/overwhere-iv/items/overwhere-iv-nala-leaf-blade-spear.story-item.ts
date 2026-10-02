import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIvNalaLeafBladeSpear = {
  id: "01a0fe3e-06ea-7f64-b302-0230e69bc5b2",
  type: "page-type/story-item",
  slug: "overwhere-iv-nala-leaf-blade-spear",
  title: "Leaf-Bladed Spear",
  story: "story-played/overwhere-iv",
  character: "character-player/overwhere-iv-nala",
  slot: "item-slot/main-hand",
  description:
    "A dark grey leaf blade of hardened iron, bright-edged, with an iron crossbar behind it, on a seasoned ash shaft with an iron butt cap.",
} as const satisfies StoryItem
