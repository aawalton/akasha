import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsRadioactive = {
  id: "01a0676a-d727-7042-999d-e43aa184825b",
  type: "page-type/release",
  slug: "imagine-dragons-radioactive",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2014-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2M0IZTKgkN3ZpYluF4lKAM",
      externalLink: "https://open.spotify.com/album/2M0IZTKgkN3ZpYluF4lKAM",
    },
  ],
  title: "Radioactive",
} as const satisfies Release
