import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaCantStopTheFeeling = {
  id: "01a0d52b-52d7-77e7-9a5d-8b925fdbed33",
  type: "page-type/song",
  slug: "rockapella-cant-stop-the-feeling",
  title: "Can't Stop the Feeling!",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
