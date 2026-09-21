import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayMagic = {
  id: "01a0676a-d724-7024-a49e-3ad1bac08c99",
  type: "page-type/release",
  slug: "coldplay-magic",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2014-03-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4cCfFozyo6JC8acN8uIP7u",
      externalLink: "https://open.spotify.com/album/4cCfFozyo6JC8acN8uIP7u",
    },
  ],
  title: "Magic",
} as const satisfies Release
