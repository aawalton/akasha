import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkRecharged = {
  id: "01a0676a-d727-7059-8f91-adb41416c603",
  type: "page-type/release",
  slug: "linkin-park-recharged",
  title: "RECHARGED",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 68.803233,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2013-10-25",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2FUsvD1bw53HGOjAg56vRD",
      externalLink: "https://open.spotify.com/album/2FUsvD1bw53HGOjAg56vRD",
    },
  ],
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-15T16:37:53.000Z",
} as const satisfies Release
