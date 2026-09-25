import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const battlestarGalacticaSeason1 = {
  id: "01a06802-b8b8-7001-a079-85779e8abea3",
  type: "page-type/season",
  slug: "battlestar-galactica-season-1",
  title: "Battlestar Galactica Season 1",
  partOfCollections: ["show/battlestar-galactica-1978"],
  position: 1,
  ownLength: 1120.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1978-09-18",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-1629",
      externalLink: "https://trakt.tv/shows/battlestar-galactica/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
