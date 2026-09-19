import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeDelayed = {
  id: "01a0b4c8-3ee2-71f8-a0a7-6db20a3188fb",
  type: "page-type/track",
  slug: "paul-cardall-new-life-delayed",
  ownLength: 2.9953333333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-new-life"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5lfE6xJbmgrcqcEF6ehzqy",
      externalLink: "https://open.spotify.com/track/5lfE6xJbmgrcqcEF6ehzqy",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Delayed",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "delayed|7FQRbf8gbKw8KZQZAJWxH2|179720",
  song: "song/paul-cardall-delayed",
} as const satisfies Track
