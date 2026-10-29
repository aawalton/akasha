import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS01e05 = {
  id: "01a18844-610b-71b7-bf51-1a6bc8fd3bec",
  type: "page-type/episode",
  slug: "clone-wars-s01e05",
  description: "Rookie clones must fend for themselves against an invasion.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-clone-wars-season-1"],
  position: 5,
  publishedAt: "2008-10-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "286573",
      externalLink: "https://www.themoviedb.org/tv/4194/season/1/episode/5",
    },
  ],
  title: "Rookies",
  episodeType: "standard",
  stillPath: "/iegMJzoLSxCddHJBgRdA9gZAhYt.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
