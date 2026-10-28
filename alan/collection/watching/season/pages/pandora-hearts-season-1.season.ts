import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const pandoraHeartsSeason1 = {
  id: "01a183db-4318-7967-886b-6360b492ac30",
  type: "page-type/season",
  slug: "pandora-hearts-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/pandora-hearts"],
  position: 1,
  publishedAt: "2009-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "46760",
      externalLink: "https://www.themoviedb.org/tv/35971/season/1",
    },
  ],
  title: "Pandora Hearts Season 1",
  posterPath: "/eAhA7qil1Rq0JQUMkpKuCcwyfT4.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:52:27.286Z",
  updatedAt: "2026-10-28T18:52:27.286Z",
} as const satisfies Season
