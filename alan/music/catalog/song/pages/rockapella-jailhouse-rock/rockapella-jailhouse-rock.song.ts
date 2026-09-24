import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaJailhouseRock = {
  id: "01a0d52b-52d9-76f0-befe-f00953cc2e18",
  type: "page-type/song",
  slug: "rockapella-jailhouse-rock",
  title: "Jailhouse Rock",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
