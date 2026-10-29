import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const warehouse13S01e01 = {
  id: "01a18859-886e-728d-b19b-dba8d6aa4d50",
  type: "page-type/episode",
  slug: "warehouse-13-s01e01",
  description:
    'Secret Service agents Lattimer and Bering are "rewarded" with a transfer to the top-secret Warehouse 13. They meet Artie Nielsen, the caretaker of the mysterious warehouse, who tells them about their new job. The agents are responsible for the collection of every supernatural and unexplained item that the U.S. Government has ever collected. For their first assignment, they are sent to Iowa to investigate a possible artifact belonging to a college student who went berserk and assaulted his girlfriend while chanting an Italian incantation.',
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["season/warehouse-13-season-1"],
  position: 1,
  publishedAt: "2009-07-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "541575",
      externalLink: "https://www.themoviedb.org/tv/15819/season/1/episode/1",
    },
  ],
  title: "Pilot",
  episodeType: "standard",
  stillPath: "/jqEz3ii25NAoC3uY1IFFD40sVO3.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:48:51.438Z",
  updatedAt: "2026-10-29T15:48:51.438Z",
} as const satisfies Episode
