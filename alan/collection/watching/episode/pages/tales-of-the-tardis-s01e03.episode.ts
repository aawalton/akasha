import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const talesOfTheTardisS01e03 = {
  id: "01a18855-d686-7dd0-a76e-4dfaac561c59",
  type: "page-type/episode",
  slug: "tales-of-the-tardis-s01e03",
  description:
    "The Doctor and Peri meet again and remember their conflict on the mining planet Varos: a world that entertains its people with sadistic TV broadcasts.",
  ownLength: 93,
  ownProgress: 0,
  partOfCollections: ["season/tales-of-the-tardis-season-1"],
  position: 3,
  publishedAt: "2023-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4877010",
      externalLink: "https://www.themoviedb.org/tv/238486/season/1/episode/3",
    },
  ],
  title: "Vengeance on Varos",
  episodeType: "standard",
  stillPath: "/btY8IrBLpOZVlgpgv5OpvTFFTlo.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:44:49.285Z",
  updatedAt: "2026-10-29T15:44:49.285Z",
} as const satisfies Episode
