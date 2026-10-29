import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekShortTreksS01e02 = {
  id: "01a18853-28f0-7e04-a21c-22b923e997c4",
  type: "page-type/episode",
  slug: "star-trek-short-treks-s01e02",
  description:
    "After waking up in an unfamiliar sickbay, Craft finds himself on board a deserted ship, and his only companion and hope for survival is an A.I. computer interface.",
  ownLength: 18,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-short-treks-season-1"],
  position: 2,
  publishedAt: "2018-11-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1575313",
      externalLink: "https://www.themoviedb.org/tv/82491/season/1/episode/2",
    },
  ],
  title: "Calypso",
  episodeType: "standard",
  stillPath: "/pJvVBo3ncFEzNYTGNJvlZrqDldB.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:41:53.775Z",
  updatedAt: "2026-10-29T15:41:53.775Z",
} as const satisfies Episode
