import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const coldplayColoratura = {
  id: "01a0676a-d71b-7011-9b40-11bc59c01b08",
  type: "release",
  slug: "coldplay-coloratura",
  title: "Coloratura",
  partOfCollections: ["artist/coldplay"],
  position: 0,
  ownLength: 10.316,
  ownProgress: 10.316,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-07-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0G0WNcM706ASd6n7UxXuKu",
      externalLink: "https://open.spotify.com/album/0G0WNcM706ASd6n7UxXuKu",
    },
  ],
} as const satisfies Release
