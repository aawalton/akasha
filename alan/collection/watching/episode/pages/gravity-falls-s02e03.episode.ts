import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gravityFallsS02e03 = {
  id: "01a18849-545f-7025-b06b-acd09ff07332",
  type: "page-type/episode",
  slug: "gravity-falls-s02e03",
  description:
    "After being belittled by Pacifica one too many times, Mabel challenges her to a miniature golf-off which gets a tad out of control when some local residents offer their help.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gravity-falls-season-2"],
  position: 3,
  publishedAt: "2014-08-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1002898",
      externalLink: "https://www.themoviedb.org/tv/40075/season/2/episode/3",
    },
  ],
  title: "The Golf War",
  episodeType: "standard",
  stillPath: "/e51f1OYEgGvxRQIXakITV78gyDw.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:31:09.532Z",
  updatedAt: "2026-10-29T15:31:09.532Z",
} as const satisfies Episode
