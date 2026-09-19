import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishNotMyResponsibility = {
  id: "01a0b771-115c-7608-a32e-efe1edcc9be1",
  type: "page-type/song",
  slug: "billie-eilish-not-my-responsibility",
  title: "Not My Responsibility",
  artist: "artist/billie-eilish",
  performed: true,
} as const satisfies Song
