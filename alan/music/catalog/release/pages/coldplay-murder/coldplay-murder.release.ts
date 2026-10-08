import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayMurder = {
  id: "01a0676a-d725-7017-9600-832c1c6efafa",
  type: "page-type/release",
  slug: "coldplay-murder",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2003-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "67eXmDByt2bonypIe2vJsN",
      externalLink: "https://open.spotify.com/album/67eXmDByt2bonypIe2vJsN",
    },
  ],
  title: "Murder",
  createdAt: "2026-09-03T13:17:30.277Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
