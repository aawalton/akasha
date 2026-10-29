import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS06e01 = {
  id: "01a1884a-e0ed-7cf7-8d1f-9b91d26c9314",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s06e01",
  description:
    "Callen and Sam find themselves trapped inside an armed submarine that terrorists are intending to use to hit an aircraft carrier in San Diego. Hetty goes against orders and forgoes her trip to Washington, as the team attempt  to locate and save Callen and Sam and stop the terrorist attack.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-6"],
  position: 1,
  publishedAt: "2014-09-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010205",
      externalLink: "https://www.themoviedb.org/tv/17610/season/6/episode/1",
    },
  ],
  title: "Deep Trouble (2)",
  episodeType: "standard",
  stillPath: "/8DKi5UA7d5UjazVILDgDriaeCMt.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
