import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappNotMyFault = {
  id: "01a0caa9-03b3-7522-aeae-b04965bd3a7c",
  type: "page-type/song",
  slug: "renee-rapp-not-my-fault",
  title: "Not My Fault",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
