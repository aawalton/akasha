import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineWhatWouldISay = {
  id: "01a0c621-1724-761a-9d93-7f347b83b427",
  type: "page-type/song",
  slug: "jenna-raine-what-would-i-say",
  title: "What Would I Say?",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
