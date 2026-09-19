import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraEchoOfMyShadow = {
  id: "01a0b770-eb2b-7f0f-aae4-da06e41d561a",
  type: "page-type/song",
  slug: "aurora-echo-of-my-shadow",
  title: "Echo Of My Shadow",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
