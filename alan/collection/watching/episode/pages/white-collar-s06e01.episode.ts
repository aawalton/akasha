import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS06e01 = {
  id: "01a18881-51a3-7c74-8ebb-09202881a96f",
  type: "page-type/episode",
  slug: "white-collar-s06e01",
  description:
    "Peter brings in Rebecca to help locate Neal who's been held captive, by someone she used to work with.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/white-collar-season-6"],
  position: 1,
  publishedAt: "2014-11-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010204",
      externalLink: "https://www.themoviedb.org/tv/21510/season/6/episode/1",
    },
  ],
  title: "Borrowed Time",
  episodeType: "standard",
  stillPath: "/fAO0TvAJ4u7T4E1Xm63XbU8fnFh.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
