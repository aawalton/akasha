import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallEpilogue = {
  id: "01a0b77e-aab6-7fe4-9db2-93d90b2c286e",
  type: "page-type/song",
  slug: "paul-cardall-epilogue",
  title: "Epilogue",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
