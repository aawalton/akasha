import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const phoebeBridgersSoMuchWine = {
  id: "01a0676a-d729-7046-8470-53e3a5327b13",
  type: "page-type/release",
  slug: "phoebe-bridgers-so-much-wine",
  title: "So Much Wine",
  partOfCollections: ["artist/phoebe-bridgers"],
  position: 0,
  ownLength: 21.82525,
  ownProgress: 21.82525,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2022-11-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "42iPQ0sFMyNdjTTPsEbjEC",
      externalLink: "https://open.spotify.com/album/42iPQ0sFMyNdjTTPsEbjEC",
    },
  ],
} as const satisfies Release
