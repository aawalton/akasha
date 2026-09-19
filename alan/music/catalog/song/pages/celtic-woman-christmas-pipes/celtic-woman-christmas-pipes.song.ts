import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanChristmasPipes = {
  id: "01a0b771-341f-79cc-8d43-56cee9740178",
  type: "page-type/song",
  slug: "celtic-woman-christmas-pipes",
  title: "Christmas Pipes",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
