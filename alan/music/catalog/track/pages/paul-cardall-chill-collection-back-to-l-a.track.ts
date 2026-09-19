import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionBackToLA = {
  id: "01a0b4c8-46a1-7801-aca7-ecc72cc8d5c5",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-back-to-l-a",
  ownLength: 2.0693333333333332,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6TzJRZIMdLXP6ZevAJLnKT",
      externalLink: "https://open.spotify.com/track/6TzJRZIMdLXP6ZevAJLnKT",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Back to L.A.",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "backtola|7FQRbf8gbKw8KZQZAJWxH2|124160",
  song: "song/paul-cardall-back-to-l-a",
} as const satisfies Track
