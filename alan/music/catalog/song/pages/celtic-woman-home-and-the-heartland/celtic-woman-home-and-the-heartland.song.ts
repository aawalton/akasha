import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanHomeAndTheHeartland = {
  id: "01a0b779-374a-78dc-8c18-3ab0f92a9291",
  type: "page-type/song",
  slug: "celtic-woman-home-and-the-heartland",
  title: "Home and the Heartland",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
