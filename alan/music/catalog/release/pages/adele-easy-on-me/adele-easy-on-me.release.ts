import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const adeleEasyOnMe = {
  id: "01a0676a-d71c-704c-b3bb-1878d8675300",
  type: "page-type/release",
  slug: "adele-easy-on-me",
  title: "Easy On Me",
  partOfCollections: ["artist/adele"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-10-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "224jZ4sUX7OhAuMwaxp86S",
      externalLink: "https://open.spotify.com/album/224jZ4sUX7OhAuMwaxp86S",
      lastSyncedAt: "2026-02-09",
    },
  ],
} as const satisfies Release
