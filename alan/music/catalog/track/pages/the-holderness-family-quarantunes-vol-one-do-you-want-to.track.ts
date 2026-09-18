import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyQuarantunesVolOneDoYouWantTo = {
  id: "01a0b4c6-cbc1-7003-b9e1-06938131c676",
  type: "page-type/track",
  slug: "the-holderness-family-quarantunes-vol-one-do-you-want-to",
  ownLength: 3.09115,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-quarantunes-vol-one"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5pveiSpWfJflILC0oZ6ygE",
      externalLink: "https://open.spotify.com/track/5pveiSpWfJflILC0oZ6ygE",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Do You Want To...",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "doyouwantto|6tITG4T8LpC0msapZ4wXGA|185469",
} as const satisfies Track
