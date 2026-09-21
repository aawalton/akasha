import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysClassicalForStudyingRainyDayWaltz = {
  id: "01a0afa1-c971-7f75-9744-2529a35409ac",
  type: "page-type/track",
  slug: "the-piano-guys-classical-for-studying-rainy-day-waltz",
  ownLength: 3.7321166666666667,
  ownProgress: 3.7321166666666667,
  partOfCollections: ["release/the-piano-guys-classical-for-studying"],
  position: 10,
  status: "completed",
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
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "rainydaywaltz|0jW6R8CVyVohuUJVcuweDI|223927",
  song: "song/the-piano-guys-rainy-day-waltz",
  carriedBy: [
    {
      release: "release/the-piano-guys-classical-for-studying",
      discNumber: 1,
      position: 10,
      externalId: "687mPrGeQeTVZmN9BGXfDi",
      externalLink: "https://open.spotify.com/track/687mPrGeQeTVZmN9BGXfDi",
    },
  ],
} as const satisfies Track
