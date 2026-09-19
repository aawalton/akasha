import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayMiraclesSomeoneSpecial = {
  id: "01a0ba64-cdea-75ca-9041-df516af3bc41",
  type: "page-type/song",
  slug: "coldplay-miracles-someone-special",
  title: "Miracles (Someone Special)",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
