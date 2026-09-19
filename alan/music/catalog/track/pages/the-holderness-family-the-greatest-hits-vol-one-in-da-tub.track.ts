import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyTheGreatestHitsVolOneInDaTub = {
  id: "01a0b4c6-d32c-7dc8-a3d4-3d8624fbe4c6",
  type: "page-type/track",
  slug: "the-holderness-family-the-greatest-hits-vol-one-in-da-tub",
  ownLength: 2.2008,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-the-greatest-hits-vol-one"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2eFpMxUtCNBJyk4IjDvxkD",
      externalLink: "https://open.spotify.com/track/2eFpMxUtCNBJyk4IjDvxkD",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "In Da Tub",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "indatub|6tITG4T8LpC0msapZ4wXGA|132048",
  song: "song/the-holderness-family-in-da-tub",
} as const satisfies Track
