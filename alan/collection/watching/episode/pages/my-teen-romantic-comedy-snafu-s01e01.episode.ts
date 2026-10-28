import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myTeenRomanticComedySnafuS01e01 = {
  id: "01a183dc-f225-77eb-9e12-9ee537cb1b2a",
  type: "page-type/episode",
  slug: "my-teen-romantic-comedy-snafu-s01e01",
  description:
    'Hachiman Hikigaya is a loner with an inferiority complex who is tricked into joining the "Service Club" that helps students with their problems… at all costs.',
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-teen-romantic-comedy-snafu-season-1"],
  position: 1,
  publishedAt: "2013-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1168137",
      externalLink: "https://www.themoviedb.org/tv/65676/season/1/episode/1",
    },
  ],
  title: "Youth Romantic Comedy is Wrong, as I Expected",
  episodeType: "standard",
  stillPath: "/nBqVYNZY5vEtGDISWauJqiCEb3W.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-28T18:54:17.637Z",
  updatedAt: "2026-10-28T18:54:17.637Z",
} as const satisfies Episode
