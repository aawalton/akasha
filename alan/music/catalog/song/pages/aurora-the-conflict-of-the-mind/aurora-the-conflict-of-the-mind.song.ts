import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraTheConflictOfTheMind = {
  id: "01a0b770-da18-7769-813f-0870f8b31271",
  type: "page-type/song",
  slug: "aurora-the-conflict-of-the-mind",
  title: "The Conflict of the Mind",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
