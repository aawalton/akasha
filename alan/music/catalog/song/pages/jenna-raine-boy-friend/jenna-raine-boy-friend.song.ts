import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineBoyFriend = {
  id: "01a0c621-15e5-7322-8517-414e20551ad0",
  type: "page-type/song",
  slug: "jenna-raine-boy-friend",
  title: "Boy Friend",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
