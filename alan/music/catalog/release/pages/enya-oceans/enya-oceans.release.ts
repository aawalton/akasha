import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaOceans = {
  id: "01a0676a-d726-7014-8b94-c4ee1df207a2",
  type: "page-type/release",
  slug: "enya-oceans",
  title: "Oceans",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 55.88348333333333,
  ownProgress: 55.883483,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1997-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6k0E2a8DdU8RQUBeLvJ3ss",
      externalLink: "https://open.spotify.com/album/6k0E2a8DdU8RQUBeLvJ3ss",
    },
  ],
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Release
