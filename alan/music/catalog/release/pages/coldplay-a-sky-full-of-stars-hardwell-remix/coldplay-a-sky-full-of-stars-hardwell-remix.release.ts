import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayASkyFullOfStarsHardwellRemix = {
  id: "01a0676a-d715-7041-8cd3-af7a6858dfc5",
  type: "page-type/release",
  slug: "coldplay-a-sky-full-of-stars-hardwell-remix",
  title: "A Sky Full of Stars (Hardwell Remix)",
  partOfCollections: ["artist/coldplay"],
  position: 0,
  ownLength: 5.218733,
  ownProgress: 5.218733,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-12-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0CvMcLab5Xb0KL7gsQfhhv",
      externalLink: "https://open.spotify.com/album/0CvMcLab5Xb0KL7gsQfhhv",
    },
  ],
} as const satisfies Release
