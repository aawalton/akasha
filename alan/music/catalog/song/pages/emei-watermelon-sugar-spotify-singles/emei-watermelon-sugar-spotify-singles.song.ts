import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiWatermelonSugarSpotifySingles = {
  id: "01a0c43e-7a11-79ce-9ff9-98fc7b48d010",
  type: "page-type/song",
  slug: "emei-watermelon-sugar-spotify-singles",
  title: "Watermelon Sugar - Spotify Singles",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
