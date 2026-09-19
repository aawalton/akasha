import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheLittleDrummerBoy = {
  id: "01a0b771-3b9e-71b4-8003-b0c88f72ab30",
  type: "page-type/song",
  slug: "celtic-woman-the-little-drummer-boy",
  title: "The Little Drummer Boy",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
