import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallTheShoresOfNormandy = {
  id: "01a0676a-d72e-7009-87fc-93946768e747",
  type: "release",
  slug: "paul-cardall-the-shores-of-normandy",
  title: "The Shores of Normandy",
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  ownLength: 4.3414,
  ownProgress: 4.3414,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-06-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "76ErnhzN5N0srD2O7RuEtU",
      externalLink: "https://open.spotify.com/album/76ErnhzN5N0srD2O7RuEtU",
    },
  ],
} as const satisfies Release
