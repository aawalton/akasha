import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenHope = {
  id: "01a0b4c8-4a6b-7cc9-a920-656ee230d28b",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-hope",
  ownLength: 3.260666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4g9dYMtOJf384x3z3JCzwp",
      externalLink: "https://open.spotify.com/track/4g9dYMtOJf384x3z3JCzwp",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Hope",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "hope|7FQRbf8gbKw8KZQZAJWxH2|195640",
} as const satisfies Track
