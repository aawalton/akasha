import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftCleveland = {
  id: "01a19235-3251-7586-af3d-7ee58ae9ec73",
  type: "page-type/song",
  slug: "taylor-swift-cleveland",
  title: "Cleveland!",
  artist: "artist/taylor-swift",
  performed: true,
  createdAt: "2026-10-31T13:45:22.255Z",
  updatedAt: "2026-10-31T13:45:22.255Z",
} as const satisfies Song
