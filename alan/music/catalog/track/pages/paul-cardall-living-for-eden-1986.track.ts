import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEden1986 = {
  id: "01a0b4c8-4b01-78c9-b6a3-099c5ac73a71",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-1986",
  ownLength: 4.066,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5KPNpMPeCf3h5j4qyJ2sul",
      externalLink: "https://open.spotify.com/track/5KPNpMPeCf3h5j4qyJ2sul",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "1986",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "1986|7FQRbf8gbKw8KZQZAJWxH2|243960",
  song: "song/paul-cardall-1986",
} as const satisfies Track
