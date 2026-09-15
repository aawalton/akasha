import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerHopeless = {
  id: "01a0676a-d720-705d-9749-7490472d4586",
  type: "page-type/release",
  slug: "jada-facer-hopeless",
  title: "Hopeless",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 2.798183,
  ownProgress: 2.798183,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-11-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4BFQ8SziRa49GPO3VBKXUa",
      externalLink: "https://open.spotify.com/album/4BFQ8SziRa49GPO3VBKXUa",
    },
  ],
} as const satisfies Release
