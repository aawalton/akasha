import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkLost = {
  id: "01a0676a-d723-7068-96c3-65d5640d9150",
  type: "release",
  slug: "linkin-park-lost",
  title: "Lost",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 3.322367,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-02-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7bN4OM5mtWq0UrAxdN6qMC",
      externalLink: "https://open.spotify.com/album/7bN4OM5mtWq0UrAxdN6qMC",
    },
  ],
} as const satisfies Release
