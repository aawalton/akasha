import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS07e04 = {
  id: "01a1884a-e0ef-72bd-9640-aa60e2787793",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s07e04",
  description:
    "Callen and Sam are forced to work on their day off when they mysteriously receive a cell phone and the caller threatens the lives of innocent people if they don’t do exactly what he says.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-7"],
  position: 4,
  publishedAt: "2015-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1116474",
      externalLink: "https://www.themoviedb.org/tv/17610/season/7/episode/4",
    },
  ],
  title: "Command & Control",
  episodeType: "standard",
  stillPath: "/8FzyWQuXP8gfySe8USGJgUKvev2.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
