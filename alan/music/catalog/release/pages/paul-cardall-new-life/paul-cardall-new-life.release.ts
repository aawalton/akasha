import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallNewLife = {
  id: "01a0676a-d725-7051-b250-5fc65958956b",
  type: "page-type/release",
  slug: "paul-cardall-new-life",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2014-02-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5QJOcbjUQN8xe4AFNORN7l",
      externalLink: "https://open.spotify.com/album/5QJOcbjUQN8xe4AFNORN7l",
    },
  ],
  title: "New Life",
} as const satisfies Release
