import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NeverDieYoungTBone = {
  id: "01a0abeb-40b2-7c07-b716-35fbf24a790f",
  type: "page-type/track",
  slug: "james-taylor-2-never-die-young-t-bone",
  ownLength: 3.7944333333333335,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-never-die-young"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1GaH6RseIkZEnYVFYIIyGn",
      externalLink: "https://open.spotify.com/track/1GaH6RseIkZEnYVFYIIyGn",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "T-Bone",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "tbone|0vn7UBvSQECKJm2817Yf1P|227666",
  song: "song/james-taylor-t-bone",
} as const satisfies Track
