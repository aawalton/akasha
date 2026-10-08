import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const ledZeppelinCodaRemaster = {
  id: "01a0676a-d71b-7007-b321-6e65f139e5c7",
  type: "page-type/release",
  slug: "led-zeppelin-coda-remaster",
  title: "Coda (Remaster)",
  partOfCollections: ["artist/led-zeppelin"],
  position: 0,
  ownLength: 33.095517,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1982-11-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "228mANuRrV20jS5DCA0eER",
      externalLink: "https://open.spotify.com/album/228mANuRrV20jS5DCA0eER",
    },
  ],
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-09-15T16:37:27.000Z",
} as const satisfies Release
