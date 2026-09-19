import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanWhatChildIsThis = {
  id: "01a0b771-a52b-7b17-9c56-b292967c9758",
  type: "page-type/song",
  slug: "celtic-woman-what-child-is-this",
  title: "What Child Is This",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
