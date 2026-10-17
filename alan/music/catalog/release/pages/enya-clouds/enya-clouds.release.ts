import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaClouds = {
  id: "01a0676a-d71b-7004-a012-7aa7bda7d75f",
  type: "page-type/release",
  slug: "enya-clouds",
  title: "Clouds",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1997-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6wqNj3JTo5EJU3KTklb4N6",
      externalLink: "https://open.spotify.com/album/6wqNj3JTo5EJU3KTklb4N6",
    },
  ],
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
