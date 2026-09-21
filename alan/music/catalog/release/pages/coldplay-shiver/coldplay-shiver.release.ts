import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayShiver = {
  id: "01a0676a-d728-7074-afcd-76f06c8dff3c",
  type: "page-type/release",
  slug: "coldplay-shiver",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2000-03-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2rd83EFsdLMTyrgVizvpxX",
      externalLink: "https://open.spotify.com/album/2rd83EFsdLMTyrgVizvpxX",
    },
  ],
  title: "Shiver",
} as const satisfies Release
