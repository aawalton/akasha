import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxBearsWolves = {
  id: "01a0676a-d718-7024-8315-d22a60eb897f",
  type: "page-type/release",
  slug: "lilith-max-bears-wolves",
  grade: "A",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  publishedAt: "2024-11-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2pQqwJbB4bS6kJN1Cw4dlK",
      externalLink: "https://open.spotify.com/album/2pQqwJbB4bS6kJN1Cw4dlK",
    },
  ],
  title: "Bears & Wolves",
} as const satisfies Release
