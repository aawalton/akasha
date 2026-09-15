import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2ElvisChristmasAlbum = {
  id: "01a0676a-d71c-706b-ae12-bcea958fd44d",
  type: "page-type/release",
  slug: "elvis-presley-2-elvis-christmas-album",
  title: "Elvis' Christmas Album",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 30.714383,
  ownProgress: 30.714383,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1957-10-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6zk4RKl6JFlgLCV4Z7DQ7N",
      externalLink: "https://open.spotify.com/album/6zk4RKl6JFlgLCV4Z7DQ7N",
    },
  ],
} as const satisfies Release
