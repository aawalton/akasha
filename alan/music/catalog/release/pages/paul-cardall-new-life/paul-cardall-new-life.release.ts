import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallNewLife = {
  id: "01a0676a-d725-7051-b250-5fc65958956b",
  type: "page-type/release",
  slug: "paul-cardall-new-life",
  title: "New Life",
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  ownLength: 52.614367,
  ownProgress: 52.614367,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-02-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5QJOcbjUQN8xe4AFNORN7l",
      externalLink: "https://open.spotify.com/album/5QJOcbjUQN8xe4AFNORN7l",
    },
  ],
} as const satisfies Release
