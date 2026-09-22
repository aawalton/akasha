import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappRevengeParty = {
  id: "01a0caa9-02a2-7a90-a309-97e6198b25a9",
  type: "page-type/song",
  slug: "renee-rapp-revenge-party",
  title: "Revenge Party",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
