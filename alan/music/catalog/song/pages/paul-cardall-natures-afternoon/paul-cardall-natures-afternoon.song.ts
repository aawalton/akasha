import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallNaturesAfternoon = {
  id: "01a0b77e-5860-76f1-99b0-c66985fe8168",
  type: "page-type/song",
  slug: "paul-cardall-natures-afternoon",
  title: "Nature's Afternoon",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
