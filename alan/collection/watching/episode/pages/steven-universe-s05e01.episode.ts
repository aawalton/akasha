import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS05e01 = {
  id: "01a18855-67eb-77b8-9308-33b895c93165",
  type: "page-type/episode",
  slug: "steven-universe-s05e01",
  description: "Steven and Lars are stuck inside Topaz and try to look for a way to escape.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-5"],
  position: 1,
  publishedAt: "2017-05-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1313214",
      externalLink: "https://www.themoviedb.org/tv/61175/season/5/episode/1",
    },
  ],
  title: "Stuck Together",
  episodeType: "standard",
  stillPath: "/9MT5yRYDP3o4OvTzBDTv2VknzY6.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
