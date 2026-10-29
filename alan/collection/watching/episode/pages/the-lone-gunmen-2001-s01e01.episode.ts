import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theLoneGunmen2001S01e01 = {
  id: "01a18880-39be-71ec-8209-47fec80cb12a",
  type: "page-type/episode",
  slug: "the-lone-gunmen-2001-s01e01",
  description:
    "A Mission-Impossible style break-in as Frohike and Byers attempt to steal the Octium IV chip from E-Com-Con's top security room.",
  ownLength: 45,
  ownProgress: 45,
  partOfCollections: ["season/the-lone-gunmen-season-1"],
  position: 1,
  publishedAt: "2001-03-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "366272",
      externalLink: "https://www.themoviedb.org/tv/5715/season/1/episode/1",
    },
  ],
  title: "Pilot",
  episodeType: "standard",
  stillPath: "/jYGHShUQ8cn1iocsdwEWmldvY4l.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T16:31:07.198Z",
  updatedAt: "2026-10-29T16:31:07.198Z",
} as const satisfies Episode
