import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e21 = {
  id: "01a1887f-e18a-7f75-ab2b-cf170a5bc26a",
  type: "page-type/episode",
  slug: "star-trek-2-s03e21",
  description:
    "Captain Kirk races against time to acquire plague-fighting minerals from a world in the midst of a civil uprising against a grievous social class disparity.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 21,
  publishedAt: "1969-02-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14027",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/21",
    },
  ],
  title: "The Cloud Minders",
  episodeType: "standard",
  stillPath: "/fUHD6Dqet0DAxjYwEatXzvd0kun.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
