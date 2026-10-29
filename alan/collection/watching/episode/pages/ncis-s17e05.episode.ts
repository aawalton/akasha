import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS17e05 = {
  id: "01a1884b-ef79-7a08-a330-7dcde8fc44db",
  type: "page-type/episode",
  slug: "ncis-s17e05",
  description:
    "NCIS investigates Marine Corporal Laney Alimonte after evidence suggests she murdered her neighbor while being treated for insomnia by a hypnotherapist.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-17"],
  position: 5,
  publishedAt: "2019-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1953813",
      externalLink: "https://www.themoviedb.org/tv/4614/season/17/episode/5",
    },
  ],
  title: "Wide Awake",
  episodeType: "standard",
  stillPath: "/73AKlsPjjVSFvHoJG5rpXzesVQD.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
