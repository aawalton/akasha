import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayMagic = {
  id: "01a0676a-d724-7024-a49e-3ad1bac08c99",
  type: "release",
  slug: "coldplay-magic",
  title: "Magic",
  partOfCollections: ["artist/coldplay"],
  position: 0,
  ownLength: 4.750233,
  ownProgress: 4.750233,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-03-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4cCfFozyo6JC8acN8uIP7u",
      externalLink: "https://open.spotify.com/album/4cCfFozyo6JC8acN8uIP7u",
    },
  ],
} as const satisfies Release
