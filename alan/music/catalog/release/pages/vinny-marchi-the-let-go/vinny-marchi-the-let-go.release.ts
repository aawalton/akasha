import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiTheLetGo = {
  id: "01a0676a-d72d-7031-b902-8d6561638d2c",
  type: "release",
  slug: "vinny-marchi-the-let-go",
  title: "The Let Go",
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  ownLength: 3.353967,
  ownProgress: 3.353967,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2025-08-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Dls5YZde46H1OYZ47Zzf8",
      externalLink: "https://open.spotify.com/album/1Dls5YZde46H1OYZ47Zzf8",
      lastSyncedAt: "2025-10-24",
    },
  ],
} as const satisfies Release
