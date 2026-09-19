import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenMondayMorning = {
  id: "01a0b4c8-4b73-7489-8af4-1f7869f93d26",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-monday-morning",
  ownLength: 2.866,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  position: 17,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "50gOseqJMbnVLmmHHFd1SF",
      externalLink: "https://open.spotify.com/track/50gOseqJMbnVLmmHHFd1SF",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Monday Morning",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "mondaymorning|7FQRbf8gbKw8KZQZAJWxH2|171960",
  song: "song/paul-cardall-monday-morning",
} as const satisfies Track
