import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraHalfEmptyButHappy = {
  id: "01a0b770-e2f2-7b9a-9548-221476935219",
  type: "page-type/song",
  slug: "aurora-half-empty-but-happy",
  title: "Half Empty But Happy",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
