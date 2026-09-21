import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiFerrisBueller = {
  id: "01a0c43e-7c4d-7e20-99ce-15a32fa9a6d5",
  type: "page-type/song",
  slug: "emei-ferris-bueller",
  title: "Ferris Bueller",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
