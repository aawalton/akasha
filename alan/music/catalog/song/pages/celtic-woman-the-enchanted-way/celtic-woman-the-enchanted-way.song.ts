import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheEnchantedWay = {
  id: "01a0b771-58d4-7b6b-aa25-8b2def560159",
  type: "page-type/song",
  slug: "celtic-woman-the-enchanted-way",
  title: "The Enchanted Way",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
