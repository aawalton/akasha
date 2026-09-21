import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineWhoAmI = {
  id: "01a0c621-1af5-718a-b2e9-05ef6b9a1686",
  type: "page-type/song",
  slug: "jenna-raine-who-am-i",
  title: "Who Am I",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
