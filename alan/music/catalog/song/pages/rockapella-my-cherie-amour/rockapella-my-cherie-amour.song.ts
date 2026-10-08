import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaMyCherieAmour = {
  id: "01a0d52b-52d9-7d99-9f48-3b1ad39da1eb",
  type: "page-type/song",
  slug: "rockapella-my-cherie-amour",
  title: "My Cherie Amour",
  artist: "artist/rockapella",
  performed: true,
  createdAt: "2026-09-24T20:46:21.401Z",
  updatedAt: "2026-09-24T20:46:23.000Z",
} as const satisfies Song
