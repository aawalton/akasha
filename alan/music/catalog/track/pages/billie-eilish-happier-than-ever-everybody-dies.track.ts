import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverEverybodyDies = {
  id: "01a0b638-e50e-7d58-8724-13fccdc12ede",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-everybody-dies",
  ownLength: 3.4437,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5jhBwnqzNNrENXnYrAdoCe",
      externalLink: "https://open.spotify.com/track/5jhBwnqzNNrENXnYrAdoCe",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Everybody Dies",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "everybodydies|6qqNVTkY8uBg9cP3Jd7DAH|206622",
} as const satisfies Track
