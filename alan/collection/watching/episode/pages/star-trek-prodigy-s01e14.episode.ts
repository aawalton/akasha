import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS01e14 = {
  id: "01a18853-1b88-771d-aaa3-072c2e05557b",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s01e14",
  description:
    "When the crew attempts to secure transport to the Federation, they unwittingly cross paths with the Vice Admiral who is hunting them.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-1"],
  position: 14,
  publishedAt: "2022-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3983094",
      externalLink: "https://www.themoviedb.org/tv/106393/season/1/episode/14",
    },
  ],
  title: "Crossroads",
  episodeType: "standard",
  stillPath: "/vy1cCzPWfqLyTArTd8Oc7ep30HA.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
