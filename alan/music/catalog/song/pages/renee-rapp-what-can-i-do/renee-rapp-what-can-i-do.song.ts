import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappWhatCanIDo = {
  id: "01a0caa9-0ee8-7350-a013-2cfd0772206d",
  type: "page-type/song",
  slug: "renee-rapp-what-can-i-do",
  title: "What Can I Do",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
