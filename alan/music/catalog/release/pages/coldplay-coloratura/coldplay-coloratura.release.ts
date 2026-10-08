import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayColoratura = {
  id: "01a0676a-d71b-7011-9b40-11bc59c01b08",
  type: "page-type/release",
  slug: "coldplay-coloratura",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2021-07-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0G0WNcM706ASd6n7UxXuKu",
      externalLink: "https://open.spotify.com/album/0G0WNcM706ASd6n7UxXuKu",
    },
  ],
  title: "Coloratura",
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
