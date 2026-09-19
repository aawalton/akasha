import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiSugarStarsLullabyForTheAnxious = {
  id: "01a0b112-9345-7ee7-98f7-c5d0786c800a",
  type: "page-type/track",
  slug: "vinny-marchi-sugar-stars-lullaby-for-the-anxious",
  ownLength: 3.1973833333333332,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-sugar-stars"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3cjOwkLUUasPNEIK02OhpD",
      externalLink: "https://open.spotify.com/track/3cjOwkLUUasPNEIK02OhpD",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Lullaby for the Anxious",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "lullabyfortheanxious|5USAMqcbMAzF3HBmeD5pJF|191843",
  song: "song/vinny-marchi-lullaby-for-the-anxious",
} as const satisfies Track
