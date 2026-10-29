import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS01e19 = {
  id: "01a18853-1b89-7419-bd63-cc0b57cdf008",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s01e19",
  description:
    "Surrounded by the Federation armada, the crew attempts to stop their ship from destroying all of Starfleet.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-1"],
  position: 19,
  publishedAt: "2022-12-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3983099",
      externalLink: "https://www.themoviedb.org/tv/106393/season/1/episode/19",
    },
  ],
  title: "Supernova (1)",
  episodeType: "standard",
  stillPath: "/8UeiPpOmdUMOaDJhKo39F0IcuHj.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
