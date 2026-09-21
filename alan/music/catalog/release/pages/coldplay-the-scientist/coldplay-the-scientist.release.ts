import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayTheScientist = {
  id: "01a0676a-d72e-7004-8a8b-b16ac0ff4987",
  type: "page-type/release",
  slug: "coldplay-the-scientist",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2002-08-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4FtNaWzjhO9OXCRFEsSmuI",
      externalLink: "https://open.spotify.com/album/4FtNaWzjhO9OXCRFEsSmuI",
    },
  ],
  title: "The Scientist",
} as const satisfies Release
