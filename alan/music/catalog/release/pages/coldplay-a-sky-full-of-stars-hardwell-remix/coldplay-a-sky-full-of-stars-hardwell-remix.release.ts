import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayASkyFullOfStarsHardwellRemix = {
  id: "01a0676a-d715-7041-8cd3-af7a6858dfc5",
  type: "page-type/release",
  slug: "coldplay-a-sky-full-of-stars-hardwell-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2014-12-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0CvMcLab5Xb0KL7gsQfhhv",
      externalLink: "https://open.spotify.com/album/0CvMcLab5Xb0KL7gsQfhhv",
    },
  ],
  title: "A Sky Full of Stars (Hardwell Remix)",
} as const satisfies Release
