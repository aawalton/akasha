import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerLover = {
  id: "01a0676a-d724-7008-aa92-0906a3ecd135",
  type: "page-type/release",
  slug: "jada-facer-lover",
  title: "Lover",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 3.47525,
  ownProgress: 3.47525,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-09-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0SYrddL3hADGFrsCoIyvlL",
      externalLink: "https://open.spotify.com/album/0SYrddL3hADGFrsCoIyvlL",
    },
  ],
  createdAt: "2026-09-03T13:17:30.276Z",
  updatedAt: "2026-09-15T16:36:36.000Z",
} as const satisfies Release
