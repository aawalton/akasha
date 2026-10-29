import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekShortTreksS02e05 = {
  id: "01a18853-28f0-700d-8217-b8b20119808b",
  type: "page-type/episode",
  slug: "star-trek-short-treks-s02e05",
  description:
    "When a lightning storm in space scares a young Michael Burnham, her father aims to ease her fears with a mythical story about a brave little girl who faced her own fears head on.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-short-treks-season-2"],
  position: 5,
  publishedAt: "2019-12-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1947030",
      externalLink: "https://www.themoviedb.org/tv/82491/season/2/episode/5",
    },
  ],
  title: "The Girl Who Made the Stars",
  episodeType: "standard",
  stillPath: "/2t80orjcHM0YdeYGiVKqxbTW0fv.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:41:53.775Z",
  updatedAt: "2026-10-29T15:41:53.775Z",
} as const satisfies Episode
