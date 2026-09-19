import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheLordIsMyShepherd = {
  id: "01a0b779-c3fc-7a81-81b4-343019b0fd41",
  type: "page-type/song",
  slug: "paul-cardall-the-lord-is-my-shepherd",
  title: "The Lord Is My Shepherd",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
