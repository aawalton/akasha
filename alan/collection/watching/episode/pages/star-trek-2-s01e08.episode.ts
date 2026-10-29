import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e08 = {
  id: "01a1887f-e186-7247-bda3-232c9dcd1fb6",
  type: "page-type/episode",
  slug: "star-trek-2-s01e08",
  description:
    "On a planet populated by children whose aging process has been slowed artificially. Kirk’s  landing party members contract a virus that kills adults. Despite their violent attacks, Kirk is determined to help the children.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 8,
  publishedAt: "1966-10-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13961",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/8",
    },
  ],
  title: "Miri",
  episodeType: "standard",
  stillPath: "/iapoGZvidNBFedn0ROKC2JqkgBF.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
