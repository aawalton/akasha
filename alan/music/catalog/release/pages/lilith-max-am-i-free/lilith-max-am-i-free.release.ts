import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxAmIFree = {
  id: "01a0676a-d716-7037-91aa-3aff8bbcaf0d",
  type: "page-type/release",
  slug: "lilith-max-am-i-free",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  publishedAt: "2023-11-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1jKhdbNfkHIYzm2NYGXpLI",
      externalLink: "https://open.spotify.com/album/1jKhdbNfkHIYzm2NYGXpLI",
    },
  ],
  title: "Am I Free",
} as const satisfies Release
