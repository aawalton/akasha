import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraRunningWithTheWolvesWolfwalkersEdition = {
  id: "01a0676a-d728-7033-816d-2a8c47c11e6d",
  type: "page-type/release",
  slug: "aurora-running-with-the-wolves-wolfwalkers-edition",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2020-11-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5or6BEa0TARnX9gupWiCEv",
      externalLink: "https://open.spotify.com/album/5or6BEa0TARnX9gupWiCEv",
    },
  ],
  title: "Running with the Wolves (Wolfwalkers Edition)",
} as const satisfies Release
