import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS05e13 = {
  id: "01a18844-6111-72cb-876a-c26920bb955a",
  type: "page-type/episode",
  slug: "clone-wars-s05e13",
  description:
    "R2-D2 and his team must stop a sabotaged Jedi cruiser from destroying a crucial Republic conference.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/clone-wars-season-5"],
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
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
