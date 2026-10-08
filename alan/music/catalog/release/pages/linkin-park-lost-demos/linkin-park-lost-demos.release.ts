import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkLostDemos = {
  id: "01a0676a-d723-7069-add6-382418f3ec44",
  type: "page-type/release",
  slug: "linkin-park-lost-demos",
  title: "LOST DEMOS",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 48.268983,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-04-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7gXR9Abk3ybA6DmEl5PmUG",
      externalLink: "https://open.spotify.com/album/7gXR9Abk3ybA6DmEl5PmUG",
    },
  ],
  createdAt: "2026-09-03T13:17:30.275Z",
  updatedAt: "2026-09-15T16:37:53.000Z",
} as const satisfies Release
