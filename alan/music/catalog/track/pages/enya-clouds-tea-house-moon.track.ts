import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaCloudsTeaHouseMoon = {
  id: "01a0a5b0-2b0c-70cd-8bcc-2412110cfb40",
  type: "track",
  slug: "enya-clouds-tea-house-moon",
  ownLength: 2.6971,
  ownProgress: 0,
  partOfCollections: ["release/enya-clouds"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4XE2ZYfrEnTjBzGwRSMdQT",
      externalLink: "https://open.spotify.com/track/4XE2ZYfrEnTjBzGwRSMdQT",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Tea-House Moon",
} as const satisfies Track
