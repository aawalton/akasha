import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappLeaveMeAlone = {
  id: "01a0caa8-fd19-7fa5-a151-74adf63b3055",
  type: "page-type/song",
  slug: "renee-rapp-leave-me-alone",
  title: "Leave Me Alone",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
