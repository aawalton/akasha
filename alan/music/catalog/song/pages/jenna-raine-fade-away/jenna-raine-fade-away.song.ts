import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineFadeAway = {
  id: "01a0c621-20c2-7bd6-905e-1ddb2d299a7c",
  type: "page-type/song",
  slug: "jenna-raine-fade-away",
  title: "Fade Away",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
