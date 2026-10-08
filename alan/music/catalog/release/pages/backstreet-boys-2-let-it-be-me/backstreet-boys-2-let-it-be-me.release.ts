import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const backstreetBoys2LetItBeMe = {
  id: "01a0676a-d723-7001-8602-2f4caa161403",
  type: "page-type/release",
  slug: "backstreet-boys-2-let-it-be-me",
  title: "Let It Be Me",
  partOfCollections: ["artist/backstreet-boys"],
  position: 0,
  ownLength: 3.734333,
  ownProgress: 3.734333,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-09-06",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6nPJEALAjWKOE1jWPws7jj",
      externalLink: "https://open.spotify.com/album/6nPJEALAjWKOE1jWPws7jj",
    },
  ],
  createdAt: "2026-09-03T13:17:30.275Z",
  updatedAt: "2026-09-15T16:34:19.000Z",
} as const satisfies Release
