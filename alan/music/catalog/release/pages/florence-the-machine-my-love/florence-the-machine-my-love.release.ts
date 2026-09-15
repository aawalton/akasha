import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineMyLove = {
  id: "01a0676a-d725-702f-8bfe-9b5ae9aefdaf",
  type: "release",
  slug: "florence-the-machine-my-love",
  title: "My Love",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 6.815317,
  ownProgress: 6.815317,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-03-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2vVVdpXVsEKwChwFpuTWqZ",
      externalLink: "https://open.spotify.com/album/2vVVdpXVsEKwChwFpuTWqZ",
    },
  ],
} as const satisfies Release
