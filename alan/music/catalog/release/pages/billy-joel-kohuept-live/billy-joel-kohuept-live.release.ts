import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billyJoelKohueptLive = {
  id: "01a0676a-d722-704c-a8e8-977ef5abaf74",
  type: "page-type/release",
  slug: "billy-joel-kohuept-live",
  title: "Kohuept (Live)",
  partOfCollections: ["artist/billy-joel"],
  position: 0,
  ownLength: 72.973683,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1987-10-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7nZUqUuVGjxoTRq8HcdrNv",
      externalLink: "https://open.spotify.com/album/7nZUqUuVGjxoTRq8HcdrNv",
    },
  ],
  createdAt: "2026-09-03T13:17:30.274Z",
  updatedAt: "2026-09-15T16:34:19.000Z",
} as const satisfies Release
