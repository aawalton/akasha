import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineShakeItOut = {
  id: "01a0676a-d728-706a-810a-3f131676c80b",
  type: "page-type/release",
  slug: "florence-the-machine-shake-it-out",
  title: "Shake It Out",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2011-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7nfp7beJJKBceUtLc3MtLE",
      externalLink: "https://open.spotify.com/album/7nfp7beJJKBceUtLc3MtLE",
    },
  ],
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
