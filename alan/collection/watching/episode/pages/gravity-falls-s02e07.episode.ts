import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gravityFallsS02e07 = {
  id: "01a18849-545f-7a46-b8d5-25819dba298a",
  type: "page-type/episode",
  slug: "gravity-falls-s02e07",
  description:
    "The kids, along with Old Man McGucket's help, discover there is a secret society in Gravity Falls.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/gravity-falls-season-2"],
  position: 7,
  publishedAt: "2014-10-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010714",
      externalLink: "https://www.themoviedb.org/tv/40075/season/2/episode/7",
    },
  ],
  title: "Society of the Blind Eye",
  episodeType: "standard",
  stillPath: "/3NNlfwmAu1HSss3WrgDhwO1LisU.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:31:09.532Z",
  updatedAt: "2026-10-29T15:31:09.532Z",
} as const satisfies Episode
