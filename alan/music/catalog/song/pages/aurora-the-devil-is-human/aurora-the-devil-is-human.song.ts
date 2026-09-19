import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraTheDevilIsHuman = {
  id: "01a0b770-dc5c-7c57-8425-37b0351746d1",
  type: "page-type/song",
  slug: "aurora-the-devil-is-human",
  title: "The Devil is Human",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
