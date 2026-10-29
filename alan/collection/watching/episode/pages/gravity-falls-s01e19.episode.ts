import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gravityFallsS01e19 = {
  id: "01a18849-545e-7c88-8793-c5eb70a4ea59",
  type: "page-type/episode",
  slug: "gravity-falls-s01e19",
  description:
    "Dipper, Mabel, and Soos must travel through Grunkle Stan's mind to defeat a tricky dream demon summoned by Lil Gideon.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/gravity-falls-season-1"],
  position: 19,
  publishedAt: "2013-07-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "871299",
      externalLink: "https://www.themoviedb.org/tv/40075/season/1/episode/19",
    },
  ],
  title: "Dreamscaperers (1)",
  episodeType: "standard",
  stillPath: "/or9cjkwvrSW7B1HvQmlkSi66YMi.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:31:09.532Z",
  updatedAt: "2026-10-29T15:31:09.532Z",
} as const satisfies Episode
