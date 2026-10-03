import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const breathOfTheWildParaglider = {
  id: "01a10332-e99a-7e68-bad6-56a6dd661586",
  type: "page-type/story-item",
  slug: "breath-of-the-wild-paraglider",
  title: "Paraglider",
  story: "story-written/breath-of-the-wild",
  character: "character-other/breath-of-the-wild-link",
  description:
    "A folding Sheikah frame of old canvas and dark wood that opens into a sail and carries its holder on the wind, spending stamina in flight.",
} as const satisfies StoryItem
