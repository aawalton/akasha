import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiTheLetGo = {
  id: "01a0676a-d72d-7031-b902-8d6561638d2c",
  type: "page-type/release",
  slug: "vinny-marchi-the-let-go",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2025-08-15",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Dls5YZde46H1OYZ47Zzf8",
      externalLink: "https://open.spotify.com/album/1Dls5YZde46H1OYZ47Zzf8",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "The Let Go",
} as const satisfies Release
