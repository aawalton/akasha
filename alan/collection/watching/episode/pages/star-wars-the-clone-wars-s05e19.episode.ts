import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS05e19 = {
  id: "01a18854-50ad-7d74-ab83-45ff116c666a",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s05e19",
  description: "The fugitive Ahsoka escapes to the criminal depths of Coruscant.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-5"],
  position: 19,
  publishedAt: "2013-02-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010380",
      externalLink: "https://www.themoviedb.org/tv/4194/season/5/episode/19",
    },
  ],
  title: "To Catch a Jedi",
  episodeType: "standard",
  stillPath: "/8nuScBXbFKtbYcRCls3MfGHdEKd.jpg",
  voteAverage: 9,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
