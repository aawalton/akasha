import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiPoserRemastered = {
  id: "01a0676a-d727-700a-a528-1238f81be268",
  type: "page-type/release",
  slug: "vinny-marchi-poser-remastered",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2023-02-06",
  grade: "C",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "56Zi1Bgs9CCwSO43wP6PJB",
      externalLink: "https://open.spotify.com/album/56Zi1Bgs9CCwSO43wP6PJB",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "POSER (remastered)",
} as const satisfies Release
