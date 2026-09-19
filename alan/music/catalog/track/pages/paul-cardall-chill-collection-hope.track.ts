import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionHope = {
  id: "01a0b4c8-456f-729f-8690-d16a741aa23f",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-hope",
  ownLength: 3.261816666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6kfH4k8cm8FgioT0GGDPzW",
      externalLink: "https://open.spotify.com/track/6kfH4k8cm8FgioT0GGDPzW",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Hope",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "hope|7FQRbf8gbKw8KZQZAJWxH2|195709",
  song: "song/paul-cardall-hope",
} as const satisfies Track
