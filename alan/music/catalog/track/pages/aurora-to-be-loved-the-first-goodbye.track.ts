import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraToBeLovedTheFirstGoodbye = {
  id: "01a0b638-0e01-7c41-bcde-1f857736b1b5",
  type: "page-type/track",
  slug: "aurora-to-be-loved-the-first-goodbye",
  ownLength: 3.512983333333333,
  ownProgress: 0,
  partOfCollections: ["release/aurora-to-be-loved"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "27iuXGU1GaQfX3Qb2tshNN",
      externalLink: "https://open.spotify.com/track/27iuXGU1GaQfX3Qb2tshNN",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The First Goodbye",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "3NABmtfO8G8s96WFGhbR7F", artistName: "Askjell" }],
  trackKey: "thefirstgoodbye|3NABmtfO8G8s96WFGhbR7F|210779",
  song: "song/aurora-the-first-goodbye",
} as const satisfies Track
