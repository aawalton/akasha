import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixPretender = {
  id: "01a0676a-d727-7018-b25c-524f2da2001f",
  type: "page-type/release",
  slug: "pentatonix-pretender",
  title: "Pretender",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 2.9208,
  ownProgress: 2.9208,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-10-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7sFY2qG2fa1fkcoftCFQ45",
      externalLink: "https://open.spotify.com/album/7sFY2qG2fa1fkcoftCFQ45",
    },
  ],
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-15T16:38:50.000Z",
} as const satisfies Release
