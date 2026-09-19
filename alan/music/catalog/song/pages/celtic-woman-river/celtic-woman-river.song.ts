import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanRiver = {
  id: "01a0b779-22f4-7569-8f4f-990c667cae8e",
  type: "page-type/song",
  slug: "celtic-woman-river",
  title: "River",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
