import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS06e01 = {
  id: "01a18856-4003-798a-9777-03a4e2138261",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s06e01",
  description:
    "With his friends on dates, Raj must face his loneliness. Also, Wolowitz is caught in an argument between Bernadette and his mom, even while he’s in space.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-6"],
  position: 1,
  publishedAt: "2012-09-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64741",
      externalLink: "https://www.themoviedb.org/tv/1418/season/6/episode/1",
    },
  ],
  title: "The Date Night Variable",
  episodeType: "standard",
  stillPath: "/8Ayyn5aUTiWyFe4NpWIlMNloJnk.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
