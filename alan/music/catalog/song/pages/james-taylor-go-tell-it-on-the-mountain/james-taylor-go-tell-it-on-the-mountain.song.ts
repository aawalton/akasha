import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorGoTellItOnTheMountain = {
  id: "01a0b779-85cf-782a-90ea-5d3f422bb454",
  type: "page-type/song",
  slug: "james-taylor-go-tell-it-on-the-mountain",
  title: "Go Tell It On The Mountain",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
