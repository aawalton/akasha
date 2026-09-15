import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2WayDownInTheJungleRoom = {
  id: "01a0676a-d730-7026-bd7a-74fdb0fe185e",
  type: "release",
  slug: "elvis-presley-2-way-down-in-the-jungle-room",
  title: "Way Down in the Jungle Room",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 130.73555,
  ownProgress: 130.73555,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-08-05",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0aDuEoOhb33KsJjfkaqaCr",
      externalLink: "https://open.spotify.com/album/0aDuEoOhb33KsJjfkaqaCr",
    },
  ],
} as const satisfies Release
