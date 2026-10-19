import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixStars = {
  id: "01a0676a-d72a-7013-9317-505e43c8c6b9",
  type: "page-type/release",
  slug: "pentatonix-stars",
  title: "Stars",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 3.0577666666666667,
  ownProgress: 3.057767,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-06-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1oj7hJLfbphNZwbvupjcvd",
      externalLink: "https://open.spotify.com/album/1oj7hJLfbphNZwbvupjcvd",
    },
  ],
  createdAt: "2026-09-03T13:17:30.282Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Release
