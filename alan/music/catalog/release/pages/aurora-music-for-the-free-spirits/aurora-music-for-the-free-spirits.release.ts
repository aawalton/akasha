import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraMusicForTheFreeSpirits = {
  id: "01a0676a-d725-701c-9ca4-8c6cf4378418",
  type: "release",
  slug: "aurora-music-for-the-free-spirits",
  title: "MUSIC FOR THE FREE SPIRITS",
  partOfCollections: ["artist/aurora"],
  position: 0,
  ownLength: 22.6438,
  ownProgress: 22.6438,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-02-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3rzTunDWgImuf8YQN5qlKc",
      externalLink: "https://open.spotify.com/album/3rzTunDWgImuf8YQN5qlKc",
    },
  ],
} as const satisfies Release
