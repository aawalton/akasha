import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS02e05 = {
  id: "01a18843-d150-713f-bf71-27f6c3297679",
  type: "page-type/episode",
  slug: "bluey-s02e05",
  description:
    "During a game of hairdressers, Bluey discovers that big-headed customer Bert Handsome has nits! To help treat them, Bingo has to find her voice, while Bluey has to find her ears.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-2"],
  position: 5,
  publishedAt: "2020-03-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2194122",
      externalLink: "https://www.themoviedb.org/tv/82728/season/2/episode/5",
    },
  ],
  title: "Hairdressers",
  episodeType: "standard",
  stillPath: "/eTVRpM1PtX7LIG6kbkvCHnGKYy8.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
