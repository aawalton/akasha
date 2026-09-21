import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallTheBrokenMiracle = {
  id: "01a0676a-d72c-7038-a013-6b63371c910b",
  type: "page-type/release",
  slug: "paul-cardall-the-broken-miracle",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2021-02-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5QyZxY41tqeIlMok3tmscu",
      externalLink: "https://open.spotify.com/album/5QyZxY41tqeIlMok3tmscu",
    },
  ],
  title: "The Broken Miracle",
} as const satisfies Release
