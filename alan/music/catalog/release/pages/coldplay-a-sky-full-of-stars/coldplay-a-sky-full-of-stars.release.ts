import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayASkyFullOfStars = {
  id: "01a0676a-d715-703f-b125-a1a69bfa9c91",
  type: "page-type/release",
  slug: "coldplay-a-sky-full-of-stars",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2014-05-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5YErGPYkVAaEV04hVFdmvW",
      externalLink: "https://open.spotify.com/album/5YErGPYkVAaEV04hVFdmvW",
    },
  ],
  title: "A Sky Full of Stars",
} as const satisfies Release
