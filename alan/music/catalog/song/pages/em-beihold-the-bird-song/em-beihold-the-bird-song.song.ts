import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emBeiholdTheBirdSong = {
  id: "01a0d3ab-b5f9-793f-aaf4-015959036deb",
  type: "page-type/song",
  slug: "em-beihold-the-bird-song",
  title: "The Bird Song",
  artist: "artist/em-beihold",
  performed: true,
} as const satisfies Song
