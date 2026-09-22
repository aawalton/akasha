import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxCallingOnTheWind = {
  id: "01a0c95d-fb81-7b28-be38-f44aa8cb6079",
  type: "page-type/song",
  slug: "lilith-max-calling-on-the-wind",
  title: "Calling On The Wind",
  artist: "artist/lilith-max",
  performed: true,
} as const satisfies Song
