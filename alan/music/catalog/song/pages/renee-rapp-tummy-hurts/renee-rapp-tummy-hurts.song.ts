import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappTummyHurts = {
  id: "01a0caa9-096e-72f9-bebe-e739f1dbeda5",
  type: "page-type/song",
  slug: "renee-rapp-tummy-hurts",
  title: "Tummy Hurts",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
