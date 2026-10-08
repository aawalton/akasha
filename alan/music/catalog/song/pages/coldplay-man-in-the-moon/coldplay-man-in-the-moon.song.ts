import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayManInTheMoon = {
  id: "01a0ba64-e64d-7f03-b752-b9446a3f39bb",
  type: "page-type/song",
  slug: "coldplay-man-in-the-moon",
  title: "Man in The Moon",
  artist: "artist/coldplay",
  performed: true,
  createdAt: "2026-09-19T15:59:29.869Z",
  updatedAt: "2026-09-19T15:59:48.000Z",
} as const satisfies Song
