import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineHeartOfAKid = {
  id: "01a0c621-259b-78e0-beb3-41d5a9b97d8a",
  type: "page-type/song",
  slug: "jenna-raine-heart-of-a-kid",
  title: "Heart of a Kid",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
