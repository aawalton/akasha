import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerTheScientist = {
  id: "01a0676a-d72e-7005-a01f-246ed947fe4d",
  type: "page-type/release",
  slug: "jada-facer-the-scientist",
  title: "The Scientist",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 4.1371,
  ownProgress: 4.1371,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-12-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3U0dRdIYC3Lwtctsyh1fh7",
      externalLink: "https://open.spotify.com/album/3U0dRdIYC3Lwtctsyh1fh7",
    },
  ],
} as const satisfies Release
