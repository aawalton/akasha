import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionForgiven = {
  id: "01a0b4c8-4619-7a88-9f91-ddb282172da5",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-forgiven",
  ownLength: 4.352,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3hYOPyQoHcAEfwAU20hfdL",
      externalLink: "https://open.spotify.com/track/3hYOPyQoHcAEfwAU20hfdL",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Forgiven",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "forgiven|7FQRbf8gbKw8KZQZAJWxH2|261120",
  song: "song/paul-cardall-forgiven",
} as const satisfies Track
