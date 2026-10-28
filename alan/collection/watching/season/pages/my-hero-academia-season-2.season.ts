import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const myHeroAcademiaSeason2 = {
  id: "01a183d4-accc-78e3-8244-339ea72d4bee",
  type: "page-type/season",
  slug: "my-hero-academia-season-2",
  description:
    "U.A. High School's most prestigious event begins: the Sports Festival, an opportunity for aspiring heroes to showcase their skills to both the public and potential recruiters. However, the path to glory is never easy, especially for Izuku Midoriya, who must now face off against his talented classmates to prove his worth to the world.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/my-hero-academia"],
  position: 2,
  publishedAt: "2017-04-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86525",
      externalLink: "https://www.themoviedb.org/tv/65930/season/2",
    },
  ],
  title: "My Hero Academia Season 2",
  posterPath: "/bLggKZhdEHhvax9jeT95MDxM6CA.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Season
