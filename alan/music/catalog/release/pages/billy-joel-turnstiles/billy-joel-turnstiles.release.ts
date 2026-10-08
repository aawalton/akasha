import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billyJoelTurnstiles = {
  id: "01a0676a-d72f-7024-943b-b570ce31fa44",
  type: "page-type/release",
  slug: "billy-joel-turnstiles",
  title: "Turnstiles",
  partOfCollections: ["artist/billy-joel"],
  position: 0,
  ownLength: 36.807083,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1976-05-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7GiLfxL1su3MSqz7pmKMZi",
      externalLink: "https://open.spotify.com/album/7GiLfxL1su3MSqz7pmKMZi",
    },
  ],
  createdAt: "2026-09-03T13:17:30.287Z",
  updatedAt: "2026-09-15T16:34:19.000Z",
} as const satisfies Release
