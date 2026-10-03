import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherMoonbellNotice = {
  id: "01a10326-1ad7-71de-ae00-932bb01e63ed",
  type: "page-type/story-item",
  slug: "fairweather-moonbell-notice",
  title: "Moonbell Notice",
  story: "story-written/fairweather",
  character: "character-other/fairweather-tamsin",
  description:
    "A guild quest notice folded in four: two dozen open moonbells from the Glasswood's edge for the apothecary on Mortar Lane, six lanterns.",
} as const satisfies StoryItem
