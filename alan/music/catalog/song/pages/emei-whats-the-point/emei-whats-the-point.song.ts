import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiWhatsThePoint = {
  id: "01a0c43e-7026-7143-9dae-ebdf35efcc8a",
  type: "page-type/song",
  slug: "emei-whats-the-point",
  title: "What's the Point!",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
