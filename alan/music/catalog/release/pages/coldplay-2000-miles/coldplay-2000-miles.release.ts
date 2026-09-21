import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplay2000Miles = {
  id: "01a0676a-d714-7020-a32a-e7de208b06cc",
  type: "page-type/release",
  slug: "coldplay-2000-miles",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2003-12-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Uk9J6k7ZV1SCsezKHCg6w",
      externalLink: "https://open.spotify.com/album/0Uk9J6k7ZV1SCsezKHCg6w",
    },
  ],
  title: "2000 Miles",
} as const satisfies Release
