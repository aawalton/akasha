import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallBrokenMachine = {
  id: "01a0b77e-a829-7c8a-b196-8b2cc4b3e681",
  type: "page-type/song",
  slug: "paul-cardall-broken-machine",
  title: "Broken Machine",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
