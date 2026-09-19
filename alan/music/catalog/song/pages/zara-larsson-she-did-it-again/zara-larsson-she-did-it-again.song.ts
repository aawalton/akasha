import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonSheDidItAgain = {
  id: "01a0b783-fc9f-7322-9aaf-9f3014fe5d24",
  type: "page-type/song",
  slug: "zara-larsson-she-did-it-again",
  title: "SHE DID IT AGAIN",
  artist: "artist/zara-larsson",
  performed: true,
} as const satisfies Song
