import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheAnimatedSeriesS02e04 = {
  id: "01a1887f-fdf1-7ffc-b8bc-b1f6b9bee2f4",
  type: "page-type/episode",
  slug: "star-trek-the-animated-series-s02e04",
  description:
    "Stardate: 5275.6\n\nDr. McCoy is arrested and held responsible for causing a plague that ravaged the planet Dramia II, where he performed a mass-innoculation 19 years earlier.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/star-trek-the-animated-series-season-2"],
  position: 4,
  publishedAt: "1974-09-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "136183",
      externalLink: "https://www.themoviedb.org/tv/1992/season/2/episode/4",
    },
  ],
  title: "Albatross",
  episodeType: "standard",
  stillPath: "/cwyW2oH6JL1TNfASbRA4bZol3kS.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T16:30:51.888Z",
  updatedAt: "2026-10-29T16:30:51.888Z",
} as const satisfies Episode
