import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraToBeLovedTheFirstGoodbye = {
  id: "01a0b638-0e01-7c41-bcde-1f857736b1b5",
  type: "page-type/track",
  slug: "aurora-to-be-loved-the-first-goodbye",
  ownLength: 3.512983333333333,
  ownProgress: 3.512983333333333,
  partOfCollections: ["release/aurora-to-be-loved"],
  status: "completed",
  unit: "unit/minutes",
  title: "The First Goodbye",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Askjell" }],
  trackKey: "thefirstgoodbye|3NABmtfO8G8s96WFGhbR7F|210779",
  song: "song/aurora-the-first-goodbye",
  carriedBy: [
    {
      release: "release/aurora-to-be-loved",
      discNumber: 1,
      position: 1,
      externalId: "27iuXGU1GaQfX3Qb2tshNN",
      externalLink: "https://open.spotify.com/track/27iuXGU1GaQfX3Qb2tshNN",
    },
  ],
} as const satisfies Track
