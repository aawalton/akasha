import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekPicardS02e03 = {
  id: "01a18853-07ce-7935-a244-1fd9c25cab18",
  type: "page-type/episode",
  slug: "star-trek-picard-s02e03",
  description:
    "Picard and the crew travel back to 2024 Los Angeles in search of the “Watcher,” who can help them identify the point at which time diverged. Seven, Raffi and Rios venture out into an unfamiliar world 400 years in their past, while Picard and Jurati attempt to gather information from an unlikely, and dangerous, ally.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-picard-season-2"],
  position: 3,
  publishedAt: "2022-03-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3588578",
      externalLink: "https://www.themoviedb.org/tv/85949/season/2/episode/3",
    },
  ],
  title: "Assimilation",
  episodeType: "standard",
  stillPath: "/ltgEjwQgBw8z74YuzYRtkqPas2X.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:41:45.292Z",
  updatedAt: "2026-10-29T15:41:45.292Z",
} as const satisfies Episode
