import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const gracieAbramsStay = {
  id: "01a0676a-d72a-701b-be80-050f218977cc",
  type: "page-type/release",
  slug: "gracie-abrams-stay",
  title: "Stay",
  partOfCollections: ["artist/gracie-abrams"],
  position: 0,
  ownLength: 2.952533,
  ownProgress: 2.952533,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2019-11-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5wjbd3QuTtEVuNRlIY0o4Q",
      externalLink: "https://open.spotify.com/album/5wjbd3QuTtEVuNRlIY0o4Q",
    },
  ],
} as const satisfies Release
