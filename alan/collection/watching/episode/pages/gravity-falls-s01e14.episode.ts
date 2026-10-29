import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gravityFallsS01e14 = {
  id: "01a18849-545e-7b60-b257-a5e5a629688c",
  type: "page-type/episode",
  slug: "gravity-falls-s01e14",
  description:
    "While Stan, Dipper, Mabel and Soos are falling in a bottomless pit, they tell stories to pass the time.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gravity-falls-season-1"],
  position: 14,
  publishedAt: "2013-03-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "871297",
      externalLink: "https://www.themoviedb.org/tv/40075/season/1/episode/14",
    },
  ],
  title: "Bottomless Pit!",
  episodeType: "standard",
  stillPath: "/c5yEJOGe2b9KDzb94PRd9xdwvMN.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:31:09.532Z",
  updatedAt: "2026-10-29T15:31:09.532Z",
} as const satisfies Episode
