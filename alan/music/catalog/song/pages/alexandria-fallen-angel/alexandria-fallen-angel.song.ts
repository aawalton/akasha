import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaFallenAngel = {
  id: "01a0b76f-d195-7ace-a99c-952001590dab",
  type: "page-type/song",
  slug: "alexandria-fallen-angel",
  title: "Fallen Angel",
  artist: "artist/alexandria",
  performed: true,
} as const satisfies Song
