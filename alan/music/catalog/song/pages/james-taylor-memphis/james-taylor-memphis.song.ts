import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMemphis = {
  id: "01a0b779-7348-72bc-971b-6b5becfbf84b",
  type: "page-type/song",
  slug: "james-taylor-memphis",
  title: "Memphis",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
