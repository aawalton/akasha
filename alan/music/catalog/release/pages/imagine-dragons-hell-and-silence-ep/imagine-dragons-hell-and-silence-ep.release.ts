import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsHellAndSilenceEp = {
  id: "01a0676a-d720-7028-9735-88d6bf4d3444",
  type: "page-type/release",
  slug: "imagine-dragons-hell-and-silence-ep",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2010-06-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0q0BORsAWpbFNf7UqWwDbd",
      externalLink: "https://open.spotify.com/album/0q0BORsAWpbFNf7UqWwDbd",
    },
  ],
  title: "Hell And Silence EP",
} as const satisfies Release
