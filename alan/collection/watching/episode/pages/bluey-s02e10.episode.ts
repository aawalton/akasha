import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS02e10 = {
  id: "01a18843-d150-78d1-9bfc-5e51a86c7803",
  type: "page-type/episode",
  slug: "bluey-s02e10",
  description:
    "On Bingo and Bluey's Rug Island, a pack of felt pens can be anything - bananas, campfires, even a snake! But Dad will need to embrace his inner kid if he wants to make it his home.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-2"],
  position: 10,
  publishedAt: "2020-03-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2194072",
      externalLink: "https://www.themoviedb.org/tv/82728/season/2/episode/10",
    },
  ],
  title: "Rug Island",
  episodeType: "standard",
  stillPath: "/wHEwbJCrQYlxiYg1ugT7RCms8yf.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
