import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS01e02 = {
  id: "01a18857-c365-7ef8-aded-2daccaca4949",
  type: "page-type/episode",
  slug: "the-office-s01e02",
  description:
    "A consultant arrives to teach the staff about tolerance and diversity but Michael insists on imparting his own knowledge. Meanwhile, Jim struggles to keep hold of a lucrative contract extension.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-1"],
  position: 2,
  publishedAt: "2005-03-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170132",
      externalLink: "https://www.themoviedb.org/tv/2316/season/1/episode/2",
    },
  ],
  title: "Diversity Day",
  episodeType: "standard",
  stillPath: "/frHasw3YEEkpNlDNzHZpFjJWwhk.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
