import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallOhWhatDoYouDoInTheSummertime = {
  id: "01a0b77e-6d3b-7fbf-9a0e-50f8bc8be555",
  type: "page-type/song",
  slug: "paul-cardall-oh-what-do-you-do-in-the-summertime",
  title: "Oh what do you do in the Summertime",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
