import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraToBeAlright = {
  id: "01a0676a-d72f-7001-afc2-84f5d037001d",
  type: "page-type/release",
  slug: "aurora-to-be-alright",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2024-05-31",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Ss70sGKkEU6rHOYSRsO3A",
      externalLink: "https://open.spotify.com/album/5Ss70sGKkEU6rHOYSRsO3A",
    },
  ],
  title: "To Be Alright",
} as const satisfies Release
