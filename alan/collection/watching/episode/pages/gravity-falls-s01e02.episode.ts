import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gravityFallsS01e02 = {
  id: "01a18849-545d-7df4-bfc5-91932793e825",
  type: "page-type/episode",
  slug: "gravity-falls-s01e02",
  description:
    "When Dipper and Mabel hear rumors of a sea monster that lives at the bottom of the local lake, they enlist Soos to take them on a boating expedition to prove it really does exist.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/gravity-falls-season-1"],
  position: 2,
  publishedAt: "2012-06-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "871282",
      externalLink: "https://www.themoviedb.org/tv/40075/season/1/episode/2",
    },
  ],
  title: "The Legend of the Gobblewonker",
  episodeType: "standard",
  stillPath: "/9e17jiaO8BihsendSvSVpC6D1uR.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:31:09.532Z",
  updatedAt: "2026-10-29T15:31:09.532Z",
} as const satisfies Episode
