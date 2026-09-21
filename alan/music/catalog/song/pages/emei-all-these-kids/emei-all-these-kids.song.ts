import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiAllTheseKids = {
  id: "01a0c43e-77d5-7b7f-a99d-376598b38300",
  type: "page-type/song",
  slug: "emei-all-these-kids",
  title: "ALL THESE KIDS",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
