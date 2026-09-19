import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheBrokenMiracle = {
  id: "01a0b77e-b6b5-7487-9c87-4dc9bc9e8a30",
  type: "page-type/song",
  slug: "paul-cardall-the-broken-miracle",
  title: "The Broken Miracle",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
