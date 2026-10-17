import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineDrummingSong = {
  id: "01a0676a-d71c-703e-b908-33a41e4f1bcc",
  type: "page-type/release",
  slug: "florence-the-machine-drumming-song",
  title: "Drumming Song",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 23.072416666666665,
  ownProgress: 23.072417,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2009-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4TpneFAVpBvHJBdcrDbPZw",
      externalLink: "https://open.spotify.com/album/4TpneFAVpBvHJBdcrDbPZw",
    },
  ],
  createdAt: "2026-09-03T13:17:30.268Z",
  updatedAt: "2026-10-17T13:48:50.850Z",
} as const satisfies Release
