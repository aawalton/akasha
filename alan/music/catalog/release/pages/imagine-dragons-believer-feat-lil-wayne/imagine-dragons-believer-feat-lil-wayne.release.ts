import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsBelieverFeatLilWayne = {
  id: "01a0676a-d718-703a-8793-774340c04749",
  type: "page-type/release",
  slug: "imagine-dragons-believer-feat-lil-wayne",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2019-01-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Q0aPCxLqK5EDSJdlPkNeT",
      externalLink: "https://open.spotify.com/album/6Q0aPCxLqK5EDSJdlPkNeT",
    },
  ],
  title: "Believer (feat. Lil Wayne)",
} as const satisfies Release
