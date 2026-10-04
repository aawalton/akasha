import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIHoodedCloak = {
  id: "01a0f1c0-467e-78d0-9eef-2c710a26aefb",
  type: "page-type/story-item",
  slug: "overwhere-i-hooded-cloak",
  title: "Hooded Cloak",
  story: "story-played/overwhere-i",
  character: "character-player/overwhere-i-nala",
  description:
    "A hooded cloak of heavy grey-green wool, fastened with a wooden toggle. The hem, chewed through in three places by brambles and rock, the worst at the back, is felted shut in stiff, dark ridges; the rest of the wool is sound.",
} as const satisfies StoryItem
