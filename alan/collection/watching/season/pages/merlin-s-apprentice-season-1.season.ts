import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const merlinSApprenticeSeason1 = {
  id: "01a1884a-596d-71ea-935c-03b264260262",
  type: "page-type/season",
  slug: "merlin-s-apprentice-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/merlin-s-apprentice"],
  position: 1,
  publishedAt: "2006-04-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "33209",
      externalLink: "https://www.themoviedb.org/tv/23295/season/1",
    },
  ],
  title: "Miniseries",
  posterPath: "/tSK3eOfFLEnKH9G3VpriCscJY0j.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:32:16.365Z",
  updatedAt: "2026-10-29T15:32:16.365Z",
} as const satisfies Season
