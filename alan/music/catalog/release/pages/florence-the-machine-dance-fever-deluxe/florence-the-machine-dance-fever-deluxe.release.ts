import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineDanceFeverDeluxe = {
  id: "01a0676a-d71b-7056-b53b-73807db412f1",
  type: "page-type/release",
  slug: "florence-the-machine-dance-fever-deluxe",
  title: "Dance Fever (Deluxe)",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-05-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0uGwPmqo2DtXd0VqJOG9DD",
      externalLink: "https://open.spotify.com/album/0uGwPmqo2DtXd0VqJOG9DD",
    },
  ],
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
