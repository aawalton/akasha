import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanPanisAngelicus = {
  id: "01a0b771-3928-7dae-9e50-dd262c06b893",
  type: "page-type/song",
  slug: "celtic-woman-panis-angelicus",
  title: "Panis Angelicus",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
