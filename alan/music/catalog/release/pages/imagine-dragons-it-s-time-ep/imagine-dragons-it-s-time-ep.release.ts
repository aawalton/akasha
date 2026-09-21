import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsItSTimeEp = {
  id: "01a0676a-d722-7014-9ead-5c1809a1f6fa",
  type: "page-type/release",
  slug: "imagine-dragons-it-s-time-ep",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2011-03-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Y83alrj4BCOIjSWBrv1WZ",
      externalLink: "https://open.spotify.com/album/2Y83alrj4BCOIjSWBrv1WZ",
    },
  ],
  title: "It’s Time EP",
} as const satisfies Release
