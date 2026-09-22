import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappMoon = {
  id: "01a0caa9-0f6e-7ade-95d5-9cdafb781545",
  type: "page-type/song",
  slug: "renee-rapp-moon",
  title: "Moon",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
