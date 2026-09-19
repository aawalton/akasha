import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallSundayDrive = {
  id: "01a0b77d-c81c-7158-8894-fd197578a551",
  type: "page-type/song",
  slug: "paul-cardall-sunday-drive",
  title: "Sunday Drive",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
