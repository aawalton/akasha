import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsImagineDragonsLiveInVegas = {
  id: "01a0676a-d721-7059-89a8-df25fcebb8d6",
  type: "page-type/release",
  slug: "imagine-dragons-imagine-dragons-live-in-vegas",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2023-07-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0fQaGkCbRIg5z7ta2SCrY0",
      externalLink: "https://open.spotify.com/album/0fQaGkCbRIg5z7ta2SCrY0",
    },
  ],
  title: "Imagine Dragons Live in Vegas",
} as const satisfies Release
