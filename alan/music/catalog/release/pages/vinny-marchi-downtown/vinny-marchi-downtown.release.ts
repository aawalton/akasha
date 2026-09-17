import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiDowntown = {
  id: "01a0b112-903f-7804-9734-ec1a63aae58f",
  type: "page-type/release",
  slug: "vinny-marchi-downtown",
  ownLength: 3.4022833333333335,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2026-08-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5uzWcxlMiTcrilyFkjZJCT",
      externalLink: "https://open.spotify.com/album/5uzWcxlMiTcrilyFkjZJCT",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Downtown",
} as const satisfies Release
