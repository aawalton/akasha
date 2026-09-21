import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiDannyBoy = {
  id: "01a0676a-d71b-7065-8de3-b528e06ca36f",
  type: "page-type/release",
  slug: "vinny-marchi-danny-boy",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2022-06-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4OGJqgG1G5YdIzlKs6faZ6",
      externalLink: "https://open.spotify.com/album/4OGJqgG1G5YdIzlKs6faZ6",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Danny Boy",
} as const satisfies Release
