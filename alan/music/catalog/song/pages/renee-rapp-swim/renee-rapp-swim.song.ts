import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappSwim = {
  id: "01a0caa9-0b14-72cf-b5f9-2bb6abf26bee",
  type: "page-type/song",
  slug: "renee-rapp-swim",
  title: "Swim",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
