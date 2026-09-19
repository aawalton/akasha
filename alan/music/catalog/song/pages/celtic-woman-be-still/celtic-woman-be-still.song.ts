import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanBeStill = {
  id: "01a0b771-48df-7498-936a-c455da6a465c",
  type: "page-type/song",
  slug: "celtic-woman-be-still",
  title: "Be Still",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
