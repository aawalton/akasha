import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheCelebrateLifeConcertLiveLivingForEdenLive = {
  id: "01a0b4c8-4333-7013-8951-49e7b68bf837",
  type: "page-type/track",
  slug: "paul-cardall-the-celebrate-life-concert-live-living-for-eden-live",
  ownLength: 3.97105,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-celebrate-life-concert-live"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3c5zhV2Qw5waIuPzzgYEdg",
      externalLink: "https://open.spotify.com/track/3c5zhV2Qw5waIuPzzgYEdg",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Living for Eden - Live",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "livingforedenlive|7FQRbf8gbKw8KZQZAJWxH2|238263",
  song: "song/paul-cardall-living-for-eden",
} as const satisfies Track
