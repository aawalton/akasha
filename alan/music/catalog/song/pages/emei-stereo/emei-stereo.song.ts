import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiStereo = {
  id: "01a0c43e-76ed-7a23-a5af-593195f0c258",
  type: "page-type/song",
  slug: "emei-stereo",
  title: "Stereo",
  artist: "artist/emei",
  performed: true,
  createdAt: "2026-09-21T13:53:43.149Z",
  updatedAt: "2026-09-21T13:53:47.000Z",
} as const satisfies Song
