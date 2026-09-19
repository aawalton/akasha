import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorNothingLikeAHundredMiles = {
  id: "01a0b779-70e2-750b-9fcb-0f53dfc16a8b",
  type: "page-type/song",
  slug: "james-taylor-nothing-like-a-hundred-miles",
  title: "Nothing like a Hundred Miles",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
