import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS02e87 = {
  id: "01a183d1-bb50-7543-a2bd-0390ebb23b07",
  type: "page-type/episode",
  slug: "naruto-s02e87",
  description:
    "Jiraiya gives Naruto the task of rotating the water in a balloon until it pops. Naruto is confident that he will accomplish this stage of the training by night, but soon learns it's not as easy as expected.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-2"],
  position: 87,
  publishedAt: "2004-06-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1146874",
      externalLink: "https://www.themoviedb.org/tv/46260/season/2/episode/87",
    },
  ],
  title: "Keep on Training: Pop Goes the Water Balloon!",
  episodeType: "standard",
  stillPath: "/f30inCurfIkDkvYlWk9XDUoq4Zr.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
