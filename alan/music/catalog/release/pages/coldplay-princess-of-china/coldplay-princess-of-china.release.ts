import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayPrincessOfChina = {
  id: "01a0676a-d727-701e-aa72-ae6d29d74fc6",
  type: "page-type/release",
  slug: "coldplay-princess-of-china",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2012-06-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3yddXawPNWK9qUDqB2UMY7",
      externalLink: "https://open.spotify.com/album/3yddXawPNWK9qUDqB2UMY7",
    },
  ],
  title: "Princess of China",
} as const satisfies Release
