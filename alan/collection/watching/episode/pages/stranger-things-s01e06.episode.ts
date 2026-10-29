import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const strangerThingsS01e06 = {
  id: "01a18855-9112-732a-b991-1f45e1faa475",
  type: "page-type/episode",
  slug: "stranger-things-s01e06",
  description:
    "A frantic Jonathan looks for Nancy in the darkness, but Steve's looking for her, too. Hopper and Joyce uncover the truth about the lab's experiments.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/stranger-things-season-1"],
  position: 6,
  publishedAt: "2016-07-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1205905",
      externalLink: "https://www.themoviedb.org/tv/66732/season/1/episode/6",
    },
  ],
  title: "Chapter Six: The Monster",
  episodeType: "standard",
  stillPath: "/lNS6qycyucewz3duTr1tf1LU688.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:44:31.505Z",
  updatedAt: "2026-10-29T15:44:31.505Z",
} as const satisfies Episode
