import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS03e10 = {
  id: "01a18848-3732-78fc-b027-7737e3ef100a",
  type: "page-type/episode",
  slug: "eureka-s03e10",
  description:
    "Jo displays atypical behavior after a DNA scan malfunctions, unfortunately it's while she's interim sheriff because Carter is undergoing a 48-hour DOD recertification test.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-3"],
  position: 10,
  publishedAt: "2009-07-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335261",
      externalLink: "https://www.themoviedb.org/tv/4620/season/3/episode/10",
    },
  ],
  title: "Your Face Or Mine",
  episodeType: "standard",
  stillPath: "/4bPsrNBFtfMsW3IzRnzL6xlLfVi.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
