import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappIDo = {
  id: "01a0caa9-0ace-7a12-bf69-5fcec084773b",
  type: "page-type/song",
  slug: "renee-rapp-i-do",
  title: "I Do",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
