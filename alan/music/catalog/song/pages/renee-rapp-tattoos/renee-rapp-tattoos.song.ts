import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappTattoos = {
  id: "01a0caa9-1175-7a56-b813-8f1778a75a4d",
  type: "page-type/song",
  slug: "renee-rapp-tattoos",
  title: "Tattoos",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
