import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappWhatsWrongWithMe = {
  id: "01a0caa9-01d2-74a6-ac75-c2dca199207d",
  type: "page-type/song",
  slug: "renee-rapp-whats-wrong-with-me",
  title: "What's Wrong With Me?",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
