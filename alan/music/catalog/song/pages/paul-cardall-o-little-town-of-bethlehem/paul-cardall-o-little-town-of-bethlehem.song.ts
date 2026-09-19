import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallOLittleTownOfBethlehem = {
  id: "01a0b77d-e7aa-71fe-a1a0-2fb3a52be1cf",
  type: "page-type/song",
  slug: "paul-cardall-o-little-town-of-bethlehem",
  title: "O Little Town of Bethlehem",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
