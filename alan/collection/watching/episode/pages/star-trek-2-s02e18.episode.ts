import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e18 = {
  id: "01a1887f-e189-7e68-8a31-25c730df6321",
  type: "page-type/episode",
  slug: "star-trek-2-s02e18",
  description:
    "The crew of the Enterprise encounters an energy-draining field which may be able to destroy the galaxy.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-2"],
  position: 18,
  publishedAt: "1968-01-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14003",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/18",
    },
  ],
  title: "The Immunity Syndrome",
  episodeType: "standard",
  stillPath: "/8hlwA8StzYrQPn2vbvkdcf2zJyf.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
