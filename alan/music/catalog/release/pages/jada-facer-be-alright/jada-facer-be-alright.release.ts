import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerBeAlright = {
  id: "01a0676a-d718-7019-a17a-82de58624468",
  type: "page-type/release",
  slug: "jada-facer-be-alright",
  title: "Be Alright",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 3.010333,
  ownProgress: 3.010333,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-10-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3NptEYzfyVi3LqeXYl4fQH",
      externalLink: "https://open.spotify.com/album/3NptEYzfyVi3LqeXYl4fQH",
    },
  ],
} as const satisfies Release
