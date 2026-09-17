import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiJennyOfOldstones = {
  id: "01a0b112-9000-7848-8230-8738058c0c7a",
  type: "page-type/release",
  slug: "vinny-marchi-jenny-of-oldstones",
  ownLength: 2.833066666666667,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2026-08-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7eqsgIRJiTTg4TBglzRxc0",
      externalLink: "https://open.spotify.com/album/7eqsgIRJiTTg4TBglzRxc0",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Jenny Of Oldstones",
} as const satisfies Release
