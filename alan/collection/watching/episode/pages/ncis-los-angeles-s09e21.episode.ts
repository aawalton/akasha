import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS09e21 = {
  id: "01a1884a-e0f2-7342-8d1b-acc84107ec42",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s09e21",
  description:
    "NCIS partners with the FBI after a Marine is murdered by a rare nerve gas. Also, Deeks shares his dream to quit law enforcement and open a bar.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-9"],
  position: 21,
  publishedAt: "2018-05-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1472412",
      externalLink: "https://www.themoviedb.org/tv/17610/season/9/episode/21",
    },
  ],
  title: "Where Everybody Knows Your Name",
  episodeType: "standard",
  stillPath: "/5vZlLU6CYhmLrZuR60uWQWYOuRH.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
