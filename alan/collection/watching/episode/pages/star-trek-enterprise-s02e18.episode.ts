import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e18 = {
  id: "01a18852-d431-79c2-b7b5-a78fcadfb9b1",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e18",
  description: "Noncorporeal aliens possess the bodies of the Enterprise crew.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 18,
  publishedAt: "2003-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15573",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/18",
    },
  ],
  title: "The Crossing",
  episodeType: "standard",
  stillPath: "/mXAybJOjRQewVWMwY2Xjlo1tNxv.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
