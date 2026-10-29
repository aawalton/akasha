import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e17 = {
  id: "01a1887f-e18a-7d66-81ee-18347dea2754",
  type: "page-type/episode",
  slug: "star-trek-2-s03e17",
  description:
    "Kirk, McCoy, and Sulu are stranded on a barren planet where a mysterious woman attempts to kill them one at a time, while the Enterprise must travel halfway across the galaxy to rescue them.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 17,
  publishedAt: "1969-01-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14031",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/17",
    },
  ],
  title: "That Which Survives",
  episodeType: "standard",
  stillPath: "/wobIqo1fKJEVyPcWxB7eJBW798Y.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
