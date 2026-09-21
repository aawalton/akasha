import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2EmeraldMusicalGems = {
  id: "01a0676a-d71d-700b-9146-fcf411c45f14",
  type: "page-type/release",
  slug: "celtic-woman-2-emerald-musical-gems",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2014-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7fa6mdn2l6gNvqmvZO6TIn",
      externalLink: "https://open.spotify.com/album/7fa6mdn2l6gNvqmvZO6TIn",
    },
  ],
  title: "Emerald: Musical Gems",
} as const satisfies Release
