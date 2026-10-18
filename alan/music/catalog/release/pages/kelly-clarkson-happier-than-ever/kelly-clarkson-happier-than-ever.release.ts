import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonHappierThanEver = {
  id: "01a0676a-d71f-7047-b906-51a93362e444",
  type: "page-type/release",
  slug: "kelly-clarkson-happier-than-ever",
  title: "Happier Than Ever",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-05-25",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Yg2WbhAn0F3vFiwFnC7wO",
      externalLink: "https://open.spotify.com/album/6Yg2WbhAn0F3vFiwFnC7wO",
      lastSyncedAt: "2026-02-13",
    },
  ],
  createdAt: "2026-09-03T13:17:30.271Z",
  updatedAt: "2026-10-18T14:00:36.173Z",
} as const satisfies Release
