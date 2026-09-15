import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonBecauseOfYouRemixes = {
  id: "01a0676a-d718-7032-95a3-82889cf53181",
  type: "release",
  slug: "kelly-clarkson-because-of-you-remixes",
  title: "Because Of You - Remixes",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 46.742817,
  ownProgress: 46.742817,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2006-03-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7aGO8llWJb9DmDYS0SKTep",
      externalLink: "https://open.spotify.com/album/7aGO8llWJb9DmDYS0SKTep",
      lastSyncedAt: "2026-02-13",
    },
  ],
} as const satisfies Release
