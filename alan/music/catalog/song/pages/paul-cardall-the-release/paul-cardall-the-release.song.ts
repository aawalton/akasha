import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheRelease = {
  id: "01a0b77d-98ee-754f-98c3-c89d5ef245ec",
  type: "page-type/song",
  slug: "paul-cardall-the-release",
  title: "The Release",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
