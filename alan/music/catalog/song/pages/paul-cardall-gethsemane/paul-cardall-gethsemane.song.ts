import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallGethsemane = {
  id: "01a0b779-fc91-7bee-823d-ee04742e82bb",
  type: "page-type/song",
  slug: "paul-cardall-gethsemane",
  title: "Gethsemane",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
