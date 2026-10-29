import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const showClassS04e03 = {
  id: "01a18851-e166-7067-ac02-e8cb487ee197",
  type: "page-type/episode",
  slug: "show-class-s04e03",
  description:
    "Goldi has been flirting with Winston and doesn't even know it. Miles questions a post-grad opportunity that seems too good to be true.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/show-class-season-4"],
  position: 3,
  publishedAt: "2017-07-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1330718",
      externalLink: "https://www.themoviedb.org/tv/65152/season/4/episode/3",
    },
  ],
  title: "#ILookLikeA",
  episodeType: "standard",
  stillPath: "/hJbD6ejXA07L0yFYQe80TIShpEN.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:29.924Z",
  updatedAt: "2026-10-29T15:40:29.924Z",
} as const satisfies Episode
