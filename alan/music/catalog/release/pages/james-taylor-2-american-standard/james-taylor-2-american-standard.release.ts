import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2AmericanStandard = {
  id: "01a0676a-d717-700a-9a77-c10a59f1a7bc",
  type: "page-type/release",
  slug: "james-taylor-2-american-standard",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  publishedAt: "2020-02-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0wwpYXYdn6MSrWHZv4nyFh",
      externalLink: "https://open.spotify.com/album/0wwpYXYdn6MSrWHZv4nyFh",
    },
  ],
  title: "American Standard",
} as const satisfies Release
