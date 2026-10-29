import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS01e02 = {
  id: "01a18856-c98a-77c5-904d-96e98fdbd654",
  type: "page-type/episode",
  slug: "the-defenders-s01e02",
  description:
    "When mild-mannered Jim McLeery kills an abusive stranger, it seems a clear-cut case of self-defense. But the prosecution reveals that, in his army days, McCleery was trained to kill.",
  ownLength: 51,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-the-defenders-miniseries"],
  position: 2,
  publishedAt: "1961-09-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "454006",
      externalLink: "https://www.themoviedb.org/tv/11515/season/1/episode/2",
    },
  ],
  title: "Killer Instinct",
  episodeType: "standard",
  voteAverage: 7,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
