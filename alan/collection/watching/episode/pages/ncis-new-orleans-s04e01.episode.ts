import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS04e01 = {
  id: "01a1884b-3019-739f-a5e6-27a60eabea12",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s04e01",
  description:
    "While Pride remains on probation six weeks after his rogue takedown of the corrupt Mayor Hamilton, his team is closely monitored by Supervisory Special Agent Paula Boyd. When the FBI arrives to run lead on a case involving a stolen big rig of nuclear waste, the team must secretly investigate from the sidelines.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-4"],
  position: 1,
  publishedAt: "2017-09-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1353332",
      externalLink: "https://www.themoviedb.org/tv/61387/season/4/episode/1",
    },
  ],
  title: "Rogue Nation",
  episodeType: "standard",
  stillPath: "/jo8afivoOMeQCafwiIe9PEVNHQz.jpg",
  voteAverage: 9,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
