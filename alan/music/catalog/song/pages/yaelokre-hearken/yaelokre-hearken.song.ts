import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const yaelokreHearken = {
  id: "01a0ce87-12e5-75b4-8db7-dc1ad79dc7f5",
  type: "page-type/song",
  slug: "yaelokre-hearken",
  title: "Hearken",
  artist: "artist/yaelokre",
  performed: true,
} as const satisfies Song
