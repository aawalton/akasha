import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixMaryDidYouKnow = {
  id: "01a1546f-24ef-7cf5-adb4-4b0e93fcdcef",
  type: "page-type/song",
  slug: "pentatonix-mary-did-you-know",
  title: "Mary, Did You Know?",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
