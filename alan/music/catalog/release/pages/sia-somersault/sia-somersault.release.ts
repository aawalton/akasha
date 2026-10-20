import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaSomersault = {
  id: "01a0676a-d729-7058-8721-d46a33b60007",
  type: "page-type/release",
  slug: "sia-somersault",
  title: "Somersault",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2007-06-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Gzi1MVApjmZw3FpNjDHAQ",
      externalLink: "https://open.spotify.com/album/2Gzi1MVApjmZw3FpNjDHAQ",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.281Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
