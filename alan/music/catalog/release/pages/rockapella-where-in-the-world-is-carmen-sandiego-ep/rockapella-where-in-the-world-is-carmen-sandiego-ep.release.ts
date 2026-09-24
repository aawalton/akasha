import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const rockapellaWhereInTheWorldIsCarmenSandiegoEp = {
  id: "01a0676a-d731-700c-97fb-330e1185a251",
  type: "page-type/release",
  slug: "rockapella-where-in-the-world-is-carmen-sandiego-ep",
  title: "Where in the World Is Carmen Sandiego EP",
  partOfCollections: ["artist/rockapella"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-07-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6GbGSJdKJhhBKeHjlebt2j",
      externalLink: "https://open.spotify.com/album/6GbGSJdKJhhBKeHjlebt2j",
    },
  ],
} as const satisfies Release
