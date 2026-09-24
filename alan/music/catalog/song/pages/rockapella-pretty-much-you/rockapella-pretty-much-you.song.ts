import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaPrettyMuchYou = {
  id: "01a0d52b-52d9-7521-9db5-93302c060f1f",
  type: "page-type/song",
  slug: "rockapella-pretty-much-you",
  title: "Pretty Much You",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
