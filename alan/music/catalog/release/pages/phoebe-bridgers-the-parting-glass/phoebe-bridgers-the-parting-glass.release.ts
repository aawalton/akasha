import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const phoebeBridgersThePartingGlass = {
  id: "01a0676a-d72d-7052-95f7-67cee39a2512",
  type: "page-type/release",
  slug: "phoebe-bridgers-the-parting-glass",
  title: "The Parting Glass",
  partOfCollections: ["artist/phoebe-bridgers"],
  position: 0,
  ownLength: 26.008583,
  ownProgress: 26.008583,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2023-11-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4hC3PA7iYZp8VYpc1FKceV",
      externalLink: "https://open.spotify.com/album/4hC3PA7iYZp8VYpc1FKceV",
    },
  ],
} as const satisfies Release
