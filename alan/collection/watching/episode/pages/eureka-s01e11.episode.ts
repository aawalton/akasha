import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS01e11 = {
  id: "01a18848-3731-797d-ad68-36f96a71c2ab",
  type: "page-type/episode",
  slug: "eureka-s01e11",
  description:
    "A bad day in the lab forces Carter to rethink his decision to live in Eureka, prompting an intervention from S.A.R.A.H. (the self Activated Residential Automated Habitat.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-1"],
  position: 11,
  publishedAt: "2006-09-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335238",
      externalLink: "https://www.themoviedb.org/tv/4620/season/1/episode/11",
    },
  ],
  title: "H.O.U.S.E. Rules",
  episodeType: "standard",
  stillPath: "/erQ7wmBYdBTYgM2qQWgrfjzvpI6.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
