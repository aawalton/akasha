import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const onePunchManS01e01 = {
  id: "01a183d8-ba2f-7ab0-a545-eca82fae5db4",
  type: "page-type/episode",
  slug: "one-punch-man-s01e01",
  description:
    "Saitama is a guy who’s a hero for fun. After saving a child from certain death, he decided to become a hero and trained hard for three years. Though he’s now so strong he can defeat any opponent with a single punch, lately he feels as if, in exchange for overwhelming power, he’s lost something even more important.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/one-punch-man-season-1"],
  position: 1,
  publishedAt: "2015-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1106679",
      externalLink: "https://www.themoviedb.org/tv/63926/season/1/episode/1",
    },
  ],
  title: "The Strongest Man",
  episodeType: "standard",
  stillPath: "/r5LjUXSYANLC5f6X9qgvAjeEP2X.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:49:41.167Z",
  updatedAt: "2026-10-28T18:49:41.167Z",
} as const satisfies Episode
