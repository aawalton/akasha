import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekYouDontKnowWhatsGoingOn = {
  id: "01a0caa8-ad98-7556-a656-ae77282f6c6f",
  type: "page-type/song",
  slug: "nickel-creek-you-dont-know-whats-going-on",
  title: "You Don't Know What's Going On",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
