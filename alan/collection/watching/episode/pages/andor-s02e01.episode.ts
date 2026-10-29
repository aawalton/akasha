import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const andorS02e01 = {
  id: "01a18843-1870-7025-909e-6c62296733f2",
  type: "page-type/episode",
  slug: "andor-s02e01",
  description:
    "An undercover mission. A sanctuary threatened. A Chandrilan wedding. A chilling Imperial plan.",
  ownLength: 54,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-andor-season-2"],
  position: 1,
  publishedAt: "2025-04-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5743095",
      externalLink: "https://www.themoviedb.org/tv/83867/season/2/episode/1",
    },
  ],
  title: "One Year Later",
  episodeType: "standard",
  stillPath: "/rERVoCPadnt0j9qrmOR8SvTL6gj.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:24:20.975Z",
  updatedAt: "2026-10-29T15:24:20.975Z",
} as const satisfies Episode
