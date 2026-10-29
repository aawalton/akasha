import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS05e20 = {
  id: "01a18854-50ad-7e82-a266-42c27ef719f0",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s05e20",
  description: "On trial for murder, Ahsoka faces her greatest challenge.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-5"],
  position: 20,
  publishedAt: "2013-03-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010381",
      externalLink: "https://www.themoviedb.org/tv/4194/season/5/episode/20",
    },
  ],
  title: "The Wrong Jedi",
  episodeType: "finale",
  stillPath: "/yFQmsHjOx4BV3u28EiTG6IEto2F.jpg",
  voteAverage: 9.4,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
