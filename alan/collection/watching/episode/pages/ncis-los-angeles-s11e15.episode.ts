import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS11e15 = {
  id: "01a1884a-e0f4-78e2-80e7-7f60e9624636",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s11e15",
  description:
    "Anna Kolcheck returns to warn Callen that he is in danger and he must now work with an archenemy to stop an underground trafficking ring.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-11"],
  position: 15,
  publishedAt: "2020-02-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2172201",
      externalLink: "https://www.themoviedb.org/tv/17610/season/11/episode/15",
    },
  ],
  title: "The Circle",
  episodeType: "standard",
  stillPath: "/1CrZ18WAbbzDATFK0BU4JAfyZez.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
