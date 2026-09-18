import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraIDrinkTheLight = {
  id: "01a0b637-ea2e-7c90-a009-cc2013911eb3",
  type: "page-type/release",
  slug: "aurora-i-drink-the-light",
  ownLength: 7.948216666666666,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2026-04-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Ysa2JxQZVJQxLb6qVO6NO",
      externalLink: "https://open.spotify.com/album/0Ysa2JxQZVJQxLb6qVO6NO",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "I DRINK THE LIGHT",
} as const satisfies Release
