import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const theHoldernessFamilyComfortZone = {
  id: "01a0b77f-0193-75f5-a744-7c765d34910d",
  type: "page-type/song",
  slug: "the-holderness-family-comfort-zone",
  title: "Comfort Zone",
  artist: "artist/the-holderness-family",
  performed: true,
} as const satisfies Song
