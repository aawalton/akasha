import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryRise = {
  id: "01a0676a-d728-700c-8bf7-753ac6aa9e8b",
  type: "page-type/release",
  slug: "katy-perry-rise",
  title: "Rise",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 3.391233,
  ownProgress: 3.391233,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-07-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7oqEOzrJhQkMHvHKEHEMrK",
      externalLink: "https://open.spotify.com/album/7oqEOzrJhQkMHvHKEHEMrK",
    },
  ],
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-09-15T16:37:02.000Z",
} as const satisfies Release
