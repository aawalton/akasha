import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaAuldLangSyne = {
  id: "01a0d52b-52d7-7441-a250-64a41be47a2e",
  type: "page-type/song",
  slug: "rockapella-auld-lang-syne",
  title: "Auld Lang Syne",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
