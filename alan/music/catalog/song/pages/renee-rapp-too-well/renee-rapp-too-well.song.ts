import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappTooWell = {
  id: "01a0caa9-0f2c-7619-acad-a849891b53ea",
  type: "page-type/song",
  slug: "renee-rapp-too-well",
  title: "Too Well",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
