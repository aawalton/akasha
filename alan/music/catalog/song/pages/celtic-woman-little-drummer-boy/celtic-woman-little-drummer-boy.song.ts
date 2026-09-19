import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanLittleDrummerBoy = {
  id: "01a0b779-20a9-7e4e-9831-68703afbe8d2",
  type: "page-type/song",
  slug: "celtic-woman-little-drummer-boy",
  title: "Little Drummer Boy",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
