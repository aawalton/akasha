import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2Destiny = {
  id: "01a0676a-d71c-700d-864e-563b41e4d25b",
  type: "page-type/release",
  slug: "celtic-woman-2-destiny",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2016-01-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2UI1H3KCgGwcqYKXlHb5cY",
      externalLink: "https://open.spotify.com/album/2UI1H3KCgGwcqYKXlHb5cY",
    },
  ],
  title: "Destiny",
  createdAt: "2026-09-03T13:17:30.268Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
