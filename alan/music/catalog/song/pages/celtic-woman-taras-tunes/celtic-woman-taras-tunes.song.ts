import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTarasTunes = {
  id: "01a0b771-57a6-7b0d-a539-4c9f02c10060",
  type: "page-type/song",
  slug: "celtic-woman-taras-tunes",
  title: "Tara’s Tunes",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
