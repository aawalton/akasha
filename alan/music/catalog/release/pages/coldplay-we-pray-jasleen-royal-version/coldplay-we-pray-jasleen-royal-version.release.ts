import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayWePrayJasleenRoyalVersion = {
  id: "01a0676a-d730-7037-815e-943b18ea6c8a",
  type: "page-type/release",
  slug: "coldplay-we-pray-jasleen-royal-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2025-02-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7hvPIynnfNUqcj0QjJ3K1W",
      externalLink: "https://open.spotify.com/album/7hvPIynnfNUqcj0QjJ3K1W",
    },
  ],
  title: "WE PRAY (Jasleen Royal Version)",
} as const satisfies Release
