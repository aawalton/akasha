import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e10 = {
  id: "01a1884b-ef62-7ecf-b4ee-16d3a306047e",
  type: "page-type/episode",
  slug: "ncis-s01e10",
  description:
    "After being buried alive, a woman comes out of the grave with amnesia and the only thing she remembers is that there is a bomb aboard a Navy ship. While trying to help Jane Doe recover her identity, the team find out that not everything is what it first seemed.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 10,
  publishedAt: "2004-01-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334439",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/10",
    },
  ],
  title: "Left for Dead",
  episodeType: "standard",
  stillPath: "/pEnwTMaERa7BgUlr3ZoDUp0O3re.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
