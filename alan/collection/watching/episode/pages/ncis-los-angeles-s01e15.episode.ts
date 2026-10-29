import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS01e15 = {
  id: "01a1884a-e0e8-79b8-9b68-522852a0a0b8",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s01e15",
  description:
    "While opening a safety deposit box at a local bank, NCIS Special Agent Kensi Blye is shot after three armed assailants enter and hold everyone in the building hostage.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-1"],
  position: 15,
  publishedAt: "2010-02-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557293",
      externalLink: "https://www.themoviedb.org/tv/17610/season/1/episode/15",
    },
  ],
  title: "The Bank Job",
  episodeType: "standard",
  stillPath: "/m04EgJsOMT6Os2RblJ7YyK99VWo.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
