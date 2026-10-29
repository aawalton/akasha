import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS01e10 = {
  id: "01a18843-d14c-7894-8123-6f72e86c4890",
  type: "page-type/episode",
  slug: "bluey-s01e10",
  description:
    'Bluey and Bingo run a crazy "Hotel" with Dad as their put upon guest. But when Bingo quits over Bluey being too controlling, Dad needs to teach them the importance of compromise.',
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-1"],
  position: 10,
  publishedAt: "2018-10-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1593882",
      externalLink: "https://www.themoviedb.org/tv/82728/season/1/episode/10",
    },
  ],
  title: "Hotel",
  episodeType: "standard",
  stillPath: "/mFyLt6qBB0dafVFZQlTdGGExM2h.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
