import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherTripLantern = {
  id: "01a103fb-1477-7487-8ab1-bafd94a83a57",
  type: "page-type/story-item",
  slug: "fairweather-trip-lantern",
  title: "Trip Lantern",
  story: "story-written/fairweather",
  character: "character-player/fairweather-elsie",
  description:
    "A small tin lantern bought at a chandler's stall, with a ring to carry it by and a shutter to drop over the flame.",
} as const satisfies StoryItem
