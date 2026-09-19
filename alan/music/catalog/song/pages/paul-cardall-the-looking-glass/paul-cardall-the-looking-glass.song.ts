import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheLookingGlass = {
  id: "01a0b77e-da32-7935-abb8-84d719eaf0f2",
  type: "page-type/song",
  slug: "paul-cardall-the-looking-glass",
  title: "The Looking Glass",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
