import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineTalkOfTheTown = {
  id: "01a0c621-1665-7fee-9aa3-df8cdb68afdf",
  type: "page-type/song",
  slug: "jenna-raine-talk-of-the-town",
  title: "Talk Of The Town",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
