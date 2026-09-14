import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const billyJoelTurnstiles = {
  id: "01a0676a-d72f-7024-943b-b570ce31fa44",
  type: "release",
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
} as const satisfies Release
