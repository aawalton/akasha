import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraOurVictory = {
  id: "01a0b771-00d7-754a-b110-1841b28c3477",
  type: "page-type/song",
  slug: "aurora-our-victory",
  title: "Our Victory",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
