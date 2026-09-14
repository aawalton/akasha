import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const kellyClarksonWhereHaveYouBeen = {
  id: "01a0676a-d731-7008-8c54-eaea63d56133",
  type: "release",
  slug: "kelly-clarkson-where-have-you-been",
  title: "Where Have You Been",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 3.9651,
  ownProgress: 3.9651,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-05-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Kpy8J83AQc61i8f1RHL3y",
      externalLink: "https://open.spotify.com/album/6Kpy8J83AQc61i8f1RHL3y",
      lastSyncedAt: "2026-02-13",
    },
  ],
} as const satisfies Release
