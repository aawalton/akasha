import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emBeiholdCityOfAngels = {
  id: "01a0d3ab-b165-77fc-97fe-b21bbdce3555",
  type: "page-type/song",
  slug: "em-beihold-city-of-angels",
  title: "City of Angels",
  artist: "artist/em-beihold",
  performed: true,
} as const satisfies Song
