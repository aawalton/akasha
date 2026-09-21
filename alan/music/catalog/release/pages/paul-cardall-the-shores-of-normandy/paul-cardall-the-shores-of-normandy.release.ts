import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallTheShoresOfNormandy = {
  id: "01a0676a-d72e-7009-87fc-93946768e747",
  type: "page-type/release",
  slug: "paul-cardall-the-shores-of-normandy",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2023-06-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "76ErnhzN5N0srD2O7RuEtU",
      externalLink: "https://open.spotify.com/album/76ErnhzN5N0srD2O7RuEtU",
    },
  ],
  title: "The Shores of Normandy",
} as const satisfies Release
