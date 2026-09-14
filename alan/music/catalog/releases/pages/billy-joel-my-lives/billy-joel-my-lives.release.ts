import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const billyJoelMyLives = {
  id: "01a0676a-d725-702d-b9a8-2d4f95537323",
  type: "release",
  slug: "billy-joel-my-lives",
  title: "My Lives",
  partOfCollections: ["artist/billy-joel"],
  position: 0,
  ownLength: 288.331817,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2005-11-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5nWLdbqnLvx8z8vpzWuwcg",
      externalLink: "https://open.spotify.com/album/5nWLdbqnLvx8z8vpzWuwcg",
    },
  ],
} as const satisfies Release
