import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e15 = {
  id: "01a1884b-ef6a-7c18-b94a-cddf114da256",
  type: "page-type/episode",
  slug: "ncis-s07e15",
  description:
    "When a Marine is found dead, Gibbs, Fornell, and the team hit the open road to bust an illegal trucking operation.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 15,
  publishedAt: "2010-02-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334554",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/15",
    },
  ],
  title: "Jack-Knife",
  episodeType: "standard",
  stillPath: "/8LjxUf4xfgqZ7zVGYSwbEyaNJfb.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
