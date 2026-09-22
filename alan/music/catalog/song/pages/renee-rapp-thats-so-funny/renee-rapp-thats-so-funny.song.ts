import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappThatsSoFunny = {
  id: "01a0caa8-fff0-74dc-b6f8-71c4c6a5ffcd",
  type: "page-type/song",
  slug: "renee-rapp-thats-so-funny",
  title: "That’s So Funny",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
