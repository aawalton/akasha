import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineWhatHesNot = {
  id: "01a0c621-16a5-724d-a85d-08decd302192",
  type: "page-type/song",
  slug: "jenna-raine-what-hes-not",
  title: "What He's Not",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
