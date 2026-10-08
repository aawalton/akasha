import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysOdeToJoy = {
  id: "01a0b780-6d86-7911-b7a7-bcca5495c65a",
  type: "page-type/song",
  slug: "the-piano-guys-ode-to-joy",
  title: "Ode To Joy",
  artist: "artist/the-piano-guys",
  performed: true,
  createdAt: "2026-09-19T02:30:42.310Z",
  updatedAt: "2026-09-19T02:33:47.000Z",
} as const satisfies Song
