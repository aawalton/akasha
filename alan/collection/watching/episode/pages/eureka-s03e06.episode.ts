import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS03e06 = {
  id: "01a18848-3732-7fb0-8c54-8b75710ea705",
  type: "page-type/episode",
  slug: "eureka-s03e06",
  description:
    "Carter's job is made more difficult when a super hero emerges. Meanwhile, Zoe and her friends are imperiled when Thorne makes a subterranean search beneath Eureka.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-3"],
  position: 6,
  publishedAt: "2008-09-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335258",
      externalLink: "https://www.themoviedb.org/tv/4620/season/3/episode/6",
    },
  ],
  title: "Phased and Confused",
  episodeType: "standard",
  stillPath: "/9kDmVyStGXlaXmAb3sAPLIMdbAf.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
