import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineYouCanBlameMe = {
  id: "01a0c621-24c7-7ad0-b2fd-839ee4945e90",
  type: "page-type/song",
  slug: "jenna-raine-you-can-blame-me",
  title: "You Can Blame Me",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
