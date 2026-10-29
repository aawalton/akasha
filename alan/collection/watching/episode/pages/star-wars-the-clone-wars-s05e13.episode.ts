import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS05e13 = {
  id: "01a18854-50ad-7661-878d-8232ac9b9739",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s05e13",
  description:
    "R2-D2 and his team must stop a sabotaged Jedi cruiser from destroying a crucial Republic conference.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-5"],
  position: 13,
  publishedAt: "2013-01-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010374",
      externalLink: "https://www.themoviedb.org/tv/4194/season/5/episode/13",
    },
  ],
  title: "Point of No Return",
  episodeType: "standard",
  stillPath: "/mBFEl9G6cMMc64w1ru59EPPLiRC.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
