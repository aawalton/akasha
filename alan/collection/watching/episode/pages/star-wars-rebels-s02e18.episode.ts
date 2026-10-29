import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS02e18 = {
  id: "01a18853-ddfd-7ee9-aee9-ab7dd79bbc8a",
  type: "page-type/episode",
  slug: "star-wars-rebels-s02e18",
  description:
    "Kanan, Ezra, and Ahsoka prepare to depart to unravel Vader’s secret, while the rebels find a way to fend off the predatory creatures that occupy the planet.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-2"],
  position: 18,
  publishedAt: "2016-03-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1174484",
      externalLink: "https://www.themoviedb.org/tv/60554/season/2/episode/18",
    },
  ],
  title: "The Mystery of Chopper Base",
  episodeType: "standard",
  stillPath: "/fOvqJU3r7fmJK6Qj7zX679ezM44.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
