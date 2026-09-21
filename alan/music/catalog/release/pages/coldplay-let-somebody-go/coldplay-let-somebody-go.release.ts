import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayLetSomebodyGo = {
  id: "01a0676a-d723-7021-99f2-6a5d1722c643",
  type: "page-type/release",
  slug: "coldplay-let-somebody-go",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2022-03-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0vS8EETjc2cnCu5j32uxxq",
      externalLink: "https://open.spotify.com/album/0vS8EETjc2cnCu5j32uxxq",
    },
  ],
  title: "Let Somebody Go",
} as const satisfies Release
