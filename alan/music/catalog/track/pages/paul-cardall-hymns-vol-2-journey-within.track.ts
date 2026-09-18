import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsVol2JourneyWithin = {
  id: "01a0b4c8-6019-7651-8b77-1fda1c994b8b",
  type: "page-type/track",
  slug: "paul-cardall-hymns-vol-2-journey-within",
  ownLength: 4.763333333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-hymns-vol-2"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7B5pEcUL4UgQVsUhFPYusU",
      externalLink: "https://open.spotify.com/track/7B5pEcUL4UgQVsUhFPYusU",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Journey Within",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "journeywithin|7FQRbf8gbKw8KZQZAJWxH2|285800",
} as const satisfies Track
