import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const msMarvelMiniseries = {
  id: "01a06802-b8bb-7006-8332-73af46139622",
  type: "page-type/season",
  slug: "ms-marvel-miniseries",
  title: "Ms. Marvel Miniseries",
  partOfCollections: ["show/ms-marvel"],
  position: 1,
  ownLength: 289.2,
  ownProgress: 289.2,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-06-08",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-240815",
      externalLink: "https://trakt.tv/shows/ms-marvel/seasons/1",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
