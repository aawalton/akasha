import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionEyeToEye = {
  id: "01a0b4c8-45b2-7edd-8aa3-df2d8d0fe73b",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-eye-to-eye",
  ownLength: 4.48565,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "454DD5AAy0B5RemhQybJEJ",
      externalLink: "https://open.spotify.com/track/454DD5AAy0B5RemhQybJEJ",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Eye to Eye",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "eyetoeye|7FQRbf8gbKw8KZQZAJWxH2|269139",
  song: "song/paul-cardall-eye-to-eye",
} as const satisfies Track
