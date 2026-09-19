import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayGhostStoriesAnothersArms = {
  id: "01a0b9ee-d8da-7545-adfc-51d37f67f2f6",
  type: "page-type/track",
  slug: "coldplay-ghost-stories-anothers-arms",
  ownLength: 3.9068833333333335,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-ghost-stories"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "22uzF19LxQW87kOVkR79Fq",
      externalLink: "https://open.spotify.com/track/22uzF19LxQW87kOVkR79Fq",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Another's Arms",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "anothersarms|4gzpq5DPGxSnKTe4SA8HAU|234413",
} as const satisfies Track
