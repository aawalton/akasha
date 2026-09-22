import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekWhyShouldTheFireDie = {
  id: "01a0caa8-b747-77ff-8ad3-9ee27d3da47f",
  type: "page-type/song",
  slug: "nickel-creek-why-should-the-fire-die",
  title: "Why Should The Fire Die?",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
