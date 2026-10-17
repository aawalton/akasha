import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineDonkeyKoshDemo = {
  id: "01a0676a-d71c-7029-9d18-e9147fca128c",
  type: "page-type/release",
  slug: "florence-the-machine-donkey-kosh-demo",
  title: "Donkey Kosh (Demo)",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 2.9433333333333334,
  ownProgress: 2.943333,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-07-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3SMsERyUtIWbft2Mivs4Ny",
      externalLink: "https://open.spotify.com/album/3SMsERyUtIWbft2Mivs4Ny",
    },
  ],
  createdAt: "2026-09-03T13:17:30.268Z",
  updatedAt: "2026-10-17T13:48:50.850Z",
} as const satisfies Release
