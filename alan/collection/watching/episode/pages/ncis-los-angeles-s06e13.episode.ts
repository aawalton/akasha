import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS06e13 = {
  id: "01a1884a-e0ee-7bc4-add2-761baef1c359",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s06e13",
  description:
    "Sam and Callen need to get their hands on some key evidence after a U.S. Ambassador survives a terrorist attack.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-6"],
  position: 13,
  publishedAt: "2015-01-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1033234",
      externalLink: "https://www.themoviedb.org/tv/17610/season/6/episode/13",
    },
  ],
  title: "In the Line of Duty",
  episodeType: "standard",
  stillPath: "/hqWM6TMQFMCnaW5PFmnOqtANMiG.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
