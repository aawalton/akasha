import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallDanceOfTheLiving = {
  id: "01a0b77e-55d7-7758-98a4-172ecb17ac8a",
  type: "page-type/song",
  slug: "paul-cardall-dance-of-the-living",
  title: "Dance of the Living",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
