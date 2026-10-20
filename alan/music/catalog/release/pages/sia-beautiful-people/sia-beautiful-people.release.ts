import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaBeautifulPeople = {
  id: "01a0676a-d718-7027-a05e-e5ff261a93cb",
  type: "page-type/release",
  slug: "sia-beautiful-people",
  title: "Beautiful People",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-03-07",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "41GrpCcoPSawyIVDbLRdLW",
      externalLink: "https://open.spotify.com/album/41GrpCcoPSawyIVDbLRdLW",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.264Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
