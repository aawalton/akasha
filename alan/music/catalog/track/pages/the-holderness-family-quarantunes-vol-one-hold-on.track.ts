import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyQuarantunesVolOneHoldOn = {
  id: "01a0b4c6-cae9-7ef2-b74e-50aad6ce92d0",
  type: "page-type/track",
  slug: "the-holderness-family-quarantunes-vol-one-hold-on",
  ownLength: 3.2357,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-quarantunes-vol-one"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3dZYv5XEkuaxPxbPsSLMUi",
      externalLink: "https://open.spotify.com/track/3dZYv5XEkuaxPxbPsSLMUi",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Hold On",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "holdon|6tITG4T8LpC0msapZ4wXGA|194142",
} as const satisfies Track
