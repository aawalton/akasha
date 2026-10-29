import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS03e14 = {
  id: "01a18844-d7e9-7b68-94e8-bd7cd27ba6c0",
  type: "page-type/episode",
  slug: "criminal-minds-s03e14",
  description:
    "Rossi travels to Indianapolis to continue his investigation into the two unsolved murders that have plagued him for 20 years.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-3"],
  position: 14,
  publishedAt: "2008-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283201",
      externalLink: "https://www.themoviedb.org/tv/4057/season/3/episode/14",
    },
  ],
  title: "Damaged",
  episodeType: "standard",
  stillPath: "/duwJrwptzwNxu247mZOapLPa1lh.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
