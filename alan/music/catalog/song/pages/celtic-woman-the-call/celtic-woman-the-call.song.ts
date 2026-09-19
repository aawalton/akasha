import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheCall = {
  id: "01a0b771-7eac-73be-b88b-a13bc0dff980",
  type: "page-type/song",
  slug: "celtic-woman-the-call",
  title: "The Call",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
