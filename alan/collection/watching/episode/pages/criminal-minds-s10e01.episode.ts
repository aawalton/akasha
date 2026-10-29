import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS10e01 = {
  id: "01a18844-d7f2-7d8f-aed2-f8c0ab60dae4",
  type: "page-type/episode",
  slug: "criminal-minds-s10e01",
  description:
    "The BAU team investigates a series of murders in Bakersfield, Ca, which have left the victims unidentifiable. New agent Kate Callahan joins the BAU fold, and assists in the effort to solve the cases.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-10"],
  position: 1,
  publishedAt: "2014-10-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1000957",
      externalLink: "https://www.themoviedb.org/tv/4057/season/10/episode/1",
    },
  ],
  title: "X",
  episodeType: "standard",
  stillPath: "/tqj1OjTnAn1E9ZE0tFTr7ige3fe.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
