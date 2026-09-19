import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jonathanBaileyDancingThroughLife = {
  id: "01a0b7a7-0bc4-7cb0-aee1-9db71952065b",
  type: "page-type/song",
  slug: "jonathan-bailey-dancing-through-life",
  title: "Dancing Through Life",
  artist: "artist/jonathan-bailey",
  performed: true,
} as const satisfies Song
