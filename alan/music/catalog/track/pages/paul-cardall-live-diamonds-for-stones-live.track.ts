import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLiveDiamondsForStonesLive = {
  id: "01a0b4c8-5781-7eb5-976d-76642bb70038",
  type: "page-type/track",
  slug: "paul-cardall-live-diamonds-for-stones-live",
  ownLength: 2.86155,
  ownProgress: 2.86155,
  partOfCollections: ["release/paul-cardall-live"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "15jegJyQcjozdMXvqBsseV",
      externalLink: "https://open.spotify.com/track/15jegJyQcjozdMXvqBsseV",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Diamonds For Stones - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "diamondsforstoneslive|7FQRbf8gbKw8KZQZAJWxH2|171693",
  song: "song/paul-cardall-diamonds-for-stones",
  carriedBy: [
    {
      release: "release/paul-cardall-live",
      discNumber: 1,
      position: 2,
      externalId: "15jegJyQcjozdMXvqBsseV",
      externalLink: "https://open.spotify.com/track/15jegJyQcjozdMXvqBsseV",
    },
  ],
} as const satisfies Track
