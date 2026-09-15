import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiDistracted = {
  id: "01a0676a-d71c-7015-994f-0024a278a7cc",
  type: "page-type/release",
  slug: "emei-distracted",
  title: "Distracted",
  partOfCollections: ["artist/emei"],
  position: 0,
  ownLength: 2.68,
  ownProgress: 2.68,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2021-08-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "05pOtkIgnk3jbeEctdrQuT",
      externalLink: "https://open.spotify.com/album/05pOtkIgnk3jbeEctdrQuT",
    },
  ],
} as const satisfies Release
