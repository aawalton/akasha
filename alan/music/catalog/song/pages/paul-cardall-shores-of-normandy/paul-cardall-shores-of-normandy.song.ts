import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallShoresOfNormandy = {
  id: "01a0b77e-7cf0-7437-ada5-d169d6b996e1",
  type: "page-type/song",
  slug: "paul-cardall-shores-of-normandy",
  title: "Shores of Normandy",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
