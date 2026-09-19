import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOf2022EveryTripToCostco = {
  id: "01a0b4c6-c8de-73bb-8117-bcdb72bc1db6",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-2022-every-trip-to-costco",
  ownLength: 2.714,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-2022"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "02y1w6xPZ3ZZw2ALka1svz",
      externalLink: "https://open.spotify.com/track/02y1w6xPZ3ZZw2ALka1svz",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Every Trip To Costco",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "everytriptocostco|6tITG4T8LpC0msapZ4wXGA|162840",
  song: "song/the-holderness-family-every-trip-to-costco",
} as const satisfies Track
