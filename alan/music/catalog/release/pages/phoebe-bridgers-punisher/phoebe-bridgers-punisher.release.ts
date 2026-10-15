import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const phoebeBridgersPunisher = {
  id: "01a0676a-d727-7033-8fd9-5783a93c9ba9",
  type: "page-type/release",
  slug: "phoebe-bridgers-punisher",
  title: "Punisher",
  partOfCollections: ["artist/phoebe-bridgers"],
  position: 0,
  ownLength: 40.70908333333333,
  ownProgress: 40.709083,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-06-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Pp6qGEywDdofgFC1oFbSH",
      externalLink: "https://open.spotify.com/album/6Pp6qGEywDdofgFC1oFbSH",
    },
  ],
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-10-15T13:56:17.521Z",
} as const satisfies Release
