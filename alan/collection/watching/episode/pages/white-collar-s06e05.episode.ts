import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS06e05 = {
  id: "01a18881-51a3-7c39-992d-092070160b42",
  type: "page-type/episode",
  slug: "white-collar-s06e05",
  description:
    "Neal must orchestrate a treacherous operation for the Pink Panthers on short notice.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/white-collar-season-6"],
  position: 5,
  publishedAt: "2014-12-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1016923",
      externalLink: "https://www.themoviedb.org/tv/21510/season/6/episode/5",
    },
  ],
  title: "Whack a Mole",
  episodeType: "standard",
  stillPath: "/A5HKvwrylLiuM3OAH9r7iwQpSp3.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
