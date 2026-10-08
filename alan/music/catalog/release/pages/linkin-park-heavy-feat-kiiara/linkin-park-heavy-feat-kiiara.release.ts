import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkHeavyFeatKiiara = {
  id: "01a0676a-d720-7024-95b8-e5859b7a1949",
  type: "page-type/release",
  slug: "linkin-park-heavy-feat-kiiara",
  title: "Heavy (feat. Kiiara)",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 9.803333,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-02-16",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7yCCAkxJFamv33CoSjxpJX",
      externalLink: "https://open.spotify.com/album/7yCCAkxJFamv33CoSjxpJX",
    },
  ],
  createdAt: "2026-09-03T13:17:30.272Z",
  updatedAt: "2026-09-15T16:37:53.000Z",
} as const satisfies Release
