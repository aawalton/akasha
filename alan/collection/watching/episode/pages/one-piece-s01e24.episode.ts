import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const onePieceS01e24 = {
  id: "01a18884-52e5-77b1-a8e2-28ae87d4cb5a",
  type: "page-type/episode",
  slug: "one-piece-s01e24",
  description:
    "As Nami steals the Going Merry, Mihawk has returned to finish the job, but Zoro challenges him to a duel in order to achieve his dream.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/one-piece-season-1"],
  position: 24,
  publishedAt: "2000-05-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1152994",
      externalLink: "https://www.themoviedb.org/tv/37854/season/1/episode/24",
    },
  ],
  title: "Hawk-Eye Mihawk! The Great Swordsman Zoro Falls At Sea!",
  episodeType: "standard",
  stillPath: "/dsP1wWbhhCOs7OruKqOmOPxvN6L.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T16:35:35.779Z",
  updatedAt: "2026-10-29T16:35:35.779Z",
} as const satisfies Episode
