import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraMusicForTheFreeSpirits = {
  id: "01a0676a-d725-701c-9ca4-8c6cf4378418",
  type: "page-type/release",
  slug: "aurora-music-for-the-free-spirits",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2021-02-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3rzTunDWgImuf8YQN5qlKc",
      externalLink: "https://open.spotify.com/album/3rzTunDWgImuf8YQN5qlKc",
    },
  ],
  title: "MUSIC FOR THE FREE SPIRITS",
} as const satisfies Release
