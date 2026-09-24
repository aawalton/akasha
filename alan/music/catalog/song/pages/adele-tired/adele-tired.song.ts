import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleTired = {
  id: "01a0d52b-c259-751f-adef-ba2df21fd86d",
  type: "page-type/song",
  slug: "adele-tired",
  title: "Tired",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
