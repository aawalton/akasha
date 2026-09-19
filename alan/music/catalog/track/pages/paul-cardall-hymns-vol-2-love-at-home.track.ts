import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsVol2LoveAtHome = {
  id: "01a0b4c8-5e26-7a70-8441-d7be1d9ae8fd",
  type: "page-type/track",
  slug: "paul-cardall-hymns-vol-2-love-at-home",
  ownLength: 3.7809666666666666,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-hymns-vol-2"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "01cbdWHZ0pfafVBhRgJikz",
      externalLink: "https://open.spotify.com/track/01cbdWHZ0pfafVBhRgJikz",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Love at Home",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "loveathome|7FQRbf8gbKw8KZQZAJWxH2|226858",
  song: "song/paul-cardall-love-at-home",
} as const satisfies Track
