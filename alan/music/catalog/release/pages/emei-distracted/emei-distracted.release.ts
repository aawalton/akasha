import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiDistracted = {
  id: "01a0676a-d71c-7015-994f-0024a278a7cc",
  type: "page-type/release",
  slug: "emei-distracted",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2021-08-20",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "05pOtkIgnk3jbeEctdrQuT",
      externalLink: "https://open.spotify.com/album/05pOtkIgnk3jbeEctdrQuT",
    },
  ],
  title: "Distracted",
} as const satisfies Release
