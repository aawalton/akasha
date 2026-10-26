import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiRegularlyScheduledProgram = {
  id: "01a17878-1d58-75c6-8648-8363c7cbc6d3",
  type: "page-type/song",
  slug: "emei-regularly-scheduled-program",
  title: "Regularly Scheduled Program",
  artist: "artist/emei",
  performed: true,
  createdAt: "2026-10-26T13:48:20.183Z",
  updatedAt: "2026-10-26T13:48:20.183Z",
} as const satisfies Song
