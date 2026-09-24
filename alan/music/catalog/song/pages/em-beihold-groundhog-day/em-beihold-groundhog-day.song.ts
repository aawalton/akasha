import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emBeiholdGroundhogDay = {
  id: "01a0d3ab-b87e-7154-b263-ac09aaed6f4b",
  type: "page-type/song",
  slug: "em-beihold-groundhog-day",
  title: "Groundhog Day",
  artist: "artist/em-beihold",
  performed: true,
} as const satisfies Song
