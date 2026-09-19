import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeNoPlaceLikeHome = {
  id: "01a0b770-120d-7281-b382-5d12aa59edc4",
  type: "page-type/song",
  slug: "ariana-grande-no-place-like-home",
  title: "No Place Like Home",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
