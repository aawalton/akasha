import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS03e03 = {
  id: "01a18844-d7e8-7cd2-b59e-d90da2307ecd",
  type: "page-type/episode",
  slug: "criminal-minds-s03e03",
  description:
    "The BAU travels to Portland to assist local authorities in investigating the disappearances of people who are new to the city and have no strong social ties.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-3"],
  position: 3,
  publishedAt: "2007-10-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283187",
      externalLink: "https://www.themoviedb.org/tv/4057/season/3/episode/3",
    },
  ],
  title: "Scared to Death",
  episodeType: "standard",
  stillPath: "/5DmPk85pg9LhgFElGiiXyhANXmw.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
