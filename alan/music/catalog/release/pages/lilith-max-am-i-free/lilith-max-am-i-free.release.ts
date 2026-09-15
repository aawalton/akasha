import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxAmIFree = {
  id: "01a0676a-d716-7037-91aa-3aff8bbcaf0d",
  type: "release",
  slug: "lilith-max-am-i-free",
  title: "Am I Free",
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  ownLength: 2.380767,
  ownProgress: 2.380767,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2023-11-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1jKhdbNfkHIYzm2NYGXpLI",
      externalLink: "https://open.spotify.com/album/1jKhdbNfkHIYzm2NYGXpLI",
    },
  ],
} as const satisfies Release
