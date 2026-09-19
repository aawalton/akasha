import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheChristmasSong = {
  id: "01a0b771-3a5c-7283-b7ac-1263267b74fb",
  type: "page-type/song",
  slug: "celtic-woman-the-christmas-song",
  title: "The Christmas Song",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
