import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassHuntersHeart = {
  id: "01a0b4c8-6133-7718-8cb4-4dbc591dbf06",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-hunters-heart",
  ownLength: 2.9562166666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3laGlD2PfzC2CbZESRAONs",
      externalLink: "https://open.spotify.com/track/3laGlD2PfzC2CbZESRAONs",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Hunter's Heart",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "huntersheart|7FQRbf8gbKw8KZQZAJWxH2|177373",
} as const satisfies Track
