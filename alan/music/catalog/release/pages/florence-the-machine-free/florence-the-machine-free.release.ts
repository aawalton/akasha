import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineFree = {
  id: "01a0676a-d71e-7033-90a7-c6c638b32e98",
  type: "page-type/release",
  slug: "florence-the-machine-free",
  title: "Free",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-04-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1P2IeydghXZHVulSJLtReQ",
      externalLink: "https://open.spotify.com/album/1P2IeydghXZHVulSJLtReQ",
    },
  ],
  createdAt: "2026-09-03T13:17:30.270Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
