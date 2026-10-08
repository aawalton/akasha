import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2RaisedOnRock = {
  id: "01a0676a-d727-7048-8efa-d1810189e670",
  type: "page-type/release",
  slug: "elvis-presley-2-raised-on-rock",
  title: "Raised On Rock",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 27.474817,
  ownProgress: 27.474817,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1973-10-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2ZRE01JESBDtXwXckqGZY6",
      externalLink: "https://open.spotify.com/album/2ZRE01JESBDtXwXckqGZY6",
    },
  ],
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-15T16:35:10.000Z",
} as const satisfies Release
