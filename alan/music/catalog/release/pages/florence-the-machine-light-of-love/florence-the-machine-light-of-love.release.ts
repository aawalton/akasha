import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineLightOfLove = {
  id: "01a0676a-d723-702e-9f36-92cafbd4b58c",
  type: "page-type/release",
  slug: "florence-the-machine-light-of-love",
  title: "Light Of Love",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-04-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Aq25x5FMLzkgn5qXdLp5N",
      externalLink: "https://open.spotify.com/album/6Aq25x5FMLzkgn5qXdLp5N",
    },
  ],
  createdAt: "2026-09-03T13:17:30.275Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
