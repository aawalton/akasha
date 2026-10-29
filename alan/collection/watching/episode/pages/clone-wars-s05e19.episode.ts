import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS05e19 = {
  id: "01a18844-6111-7b19-840c-5018876705b0",
  type: "page-type/episode",
  slug: "clone-wars-s05e19",
  description: "The fugitive Ahsoka escapes to the criminal depths of Coruscant.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/clone-wars-season-5"],
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
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
