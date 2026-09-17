import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysClassicalForStudyingRainyDayWaltz = {
  id: "01a0afa1-c971-7f75-9744-2529a35409ac",
  type: "page-type/track",
  slug: "the-piano-guys-classical-for-studying-rainy-day-waltz",
  ownLength: 3.7321166666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-classical-for-studying"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "687mPrGeQeTVZmN9BGXfDi",
      externalLink: "https://open.spotify.com/track/687mPrGeQeTVZmN9BGXfDi",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Rainy Day Waltz",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "rainydaywaltz|0jW6R8CVyVohuUJVcuweDI|223927",
} as const satisfies Track
