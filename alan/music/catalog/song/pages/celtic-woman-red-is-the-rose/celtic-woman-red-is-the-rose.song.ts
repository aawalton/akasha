import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanRedIsTheRose = {
  id: "01a0b779-30a7-79e2-a478-31445ec1a93d",
  type: "page-type/song",
  slug: "celtic-woman-red-is-the-rose",
  title: "Red is the Rose",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
