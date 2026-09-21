import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theHoldernessFamilyHotDadSummer = {
  id: "01a0676a-d720-705f-a761-df0f309088c0",
  type: "page-type/release",
  slug: "the-holderness-family-hot-dad-summer",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-holderness-family"],
  position: 0,
  publishedAt: "2022-06-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3hLu8UFdpJF80hhA90GAls",
      externalLink: "https://open.spotify.com/album/3hLu8UFdpJF80hhA90GAls",
      lastSyncedAt: "2025-11-27",
    },
  ],
  title: "Hot Dad Summer",
} as const satisfies Release
