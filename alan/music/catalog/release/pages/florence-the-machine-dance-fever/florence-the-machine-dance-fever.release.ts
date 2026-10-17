import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineDanceFever = {
  id: "01a0676a-d71b-7054-b0e8-610924c3e1f3",
  type: "page-type/release",
  slug: "florence-the-machine-dance-fever",
  title: "Dance Fever",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-05-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4ohh1zQ4yybSK9FS7LLyDE",
      externalLink: "https://open.spotify.com/album/4ohh1zQ4yybSK9FS7LLyDE",
    },
  ],
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
