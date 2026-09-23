import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2OnlyTheYoungFeaturedInMissAmericana = {
  id: "01a0676a-d726-7039-9b1d-1cc7a391486b",
  type: "page-type/release",
  slug: "taylor-swift-2-only-the-young-featured-in-miss-americana",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2020-01-31",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5LGsh3kexUfi3qkIIxb8vK",
      externalLink: "https://open.spotify.com/album/5LGsh3kexUfi3qkIIxb8vK",
    },
  ],
  title: "Only The Young (Featured in Miss Americana)",
} as const satisfies Release
