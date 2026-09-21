import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallSleep = {
  id: "01a0676a-d729-7020-879d-a4fb890fed4e",
  type: "page-type/release",
  slug: "paul-cardall-sleep",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2022-06-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7KmM2VWfvX26JwYaTbmucc",
      externalLink: "https://open.spotify.com/album/7KmM2VWfvX26JwYaTbmucc",
    },
  ],
  title: "Sleep",
} as const satisfies Release
