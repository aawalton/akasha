import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishComeOutAndPlay = {
  id: "01a0676a-d71b-701a-acdf-832a2a252f4f",
  type: "page-type/release",
  slug: "billie-eilish-come-out-and-play",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2018-11-20",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0ifM8RTX9HjtCJtY9452bW",
      externalLink: "https://open.spotify.com/album/0ifM8RTX9HjtCJtY9452bW",
    },
  ],
  title: "come out and play",
} as const satisfies Release
