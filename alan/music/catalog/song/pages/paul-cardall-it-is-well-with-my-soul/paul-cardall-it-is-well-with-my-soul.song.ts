import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallItIsWellWithMySoul = {
  id: "01a0b779-e417-7345-9ec8-2f816d019bab",
  type: "page-type/song",
  slug: "paul-cardall-it-is-well-with-my-soul",
  title: "It Is Well with My Soul",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
