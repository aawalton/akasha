import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e24 = {
  id: "01a1884b-ef76-7bf5-8406-f4e26d6a78bc",
  type: "page-type/episode",
  slug: "ncis-s14e24",
  description:
    "When a Navy SEAL vanishes during  an unsanctioned trip, Gibbs, McGee, and Torres travel to an unpopulated area in Paraguay that's teeming with violent rebels.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 24,
  publishedAt: "2017-05-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1310649",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/24",
    },
  ],
  title: "Rendezvous",
  episodeType: "finale",
  stillPath: "/6k3NEb94IrihOpZLQeOGgUheM5z.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
