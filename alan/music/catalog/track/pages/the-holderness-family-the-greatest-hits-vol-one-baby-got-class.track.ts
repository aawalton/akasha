import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyTheGreatestHitsVolOneBabyGotClass = {
  id: "01a0b4c6-d27e-7ff9-bdf2-aeedf38c9384",
  type: "page-type/track",
  slug: "the-holderness-family-the-greatest-hits-vol-one-baby-got-class",
  ownLength: 2.2008,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-the-greatest-hits-vol-one"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7x5Is4tQFjbWP9qpw32P3x",
      externalLink: "https://open.spotify.com/track/7x5Is4tQFjbWP9qpw32P3x",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Baby Got Class",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "babygotclass|6tITG4T8LpC0msapZ4wXGA|132048",
  song: "song/the-holderness-family-baby-got-class",
} as const satisfies Track
