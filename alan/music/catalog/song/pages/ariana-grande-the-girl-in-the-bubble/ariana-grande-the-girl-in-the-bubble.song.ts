import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeTheGirlInTheBubble = {
  id: "01a0b770-16dc-78f6-8aa3-d1bfc221ec72",
  type: "page-type/song",
  slug: "ariana-grande-the-girl-in-the-bubble",
  title: "The Girl in the Bubble",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
