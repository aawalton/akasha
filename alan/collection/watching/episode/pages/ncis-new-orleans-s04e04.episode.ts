import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS04e04 = {
  id: "01a1884b-301a-7fa2-9bfc-07b50f60ec04",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s04e04",
  description:
    "The NCIS team investigates the copycat murder of an unsolved case from 150 years ago that spawned a legendary New Orleans ghost story. Gregorio gets spooked when the case is connected to a recent séance and a local medium.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-4"],
  position: 4,
  publishedAt: "2017-10-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1367788",
      externalLink: "https://www.themoviedb.org/tv/61387/season/4/episode/4",
    },
  ],
  title: "Dead Man Calling",
  episodeType: "standard",
  stillPath: "/kSLpyAlAWzyQ9zkrR5AKcCndgEk.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
