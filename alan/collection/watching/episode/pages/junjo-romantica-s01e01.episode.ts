import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const junjoRomanticaS01e01 = {
  id: "01a183d6-be6a-7f83-96a2-6fc7ea05973b",
  type: "page-type/episode",
  slug: "junjo-romantica-s01e01",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/junjo-romantica-season-1"],
  position: 1,
  publishedAt: "2008-04-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "848203",
      externalLink: "https://www.themoviedb.org/tv/37548/season/1/episode/1",
    },
  ],
  title: "Truth is Stranger Than Fiction",
  episodeType: "standard",
  stillPath: "/ktXNiyRppwO4yeyBD6Cvpcn8pwY.jpg",
  voteAverage: 7,
  createdAt: "2026-10-28T18:47:31.178Z",
  updatedAt: "2026-10-28T18:47:31.178Z",
} as const satisfies Episode
