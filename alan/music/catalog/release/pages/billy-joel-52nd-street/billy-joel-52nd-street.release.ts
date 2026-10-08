import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billyJoel52ndStreet = {
  id: "01a0676a-d715-7010-ac53-0f1d86dd0893",
  type: "page-type/release",
  slug: "billy-joel-52nd-street",
  title: "52nd Street",
  partOfCollections: ["artist/billy-joel"],
  position: 0,
  ownLength: 40.429283,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1978-10-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1HmCO8VK98AU6EXPOjGYyI",
      externalLink: "https://open.spotify.com/album/1HmCO8VK98AU6EXPOjGYyI",
    },
  ],
  createdAt: "2026-09-03T13:17:30.261Z",
  updatedAt: "2026-09-15T16:34:19.000Z",
} as const satisfies Release
