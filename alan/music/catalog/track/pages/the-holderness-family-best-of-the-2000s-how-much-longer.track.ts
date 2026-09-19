import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe2000sHowMuchLonger = {
  id: "01a0b4c6-cdfb-729a-bf17-f65905433f3f",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-2000s-how-much-longer",
  ownLength: 2.5756,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-2000s"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Xwv6mnZ154QDf59qydBQq",
      externalLink: "https://open.spotify.com/track/4Xwv6mnZ154QDf59qydBQq",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "How Much Longer",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "howmuchlonger|6tITG4T8LpC0msapZ4wXGA|154536",
  song: "song/the-holderness-family-how-much-longer",
} as const satisfies Track
