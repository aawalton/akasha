import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e01 = {
  id: "01a18852-d432-73ae-a09a-084afa522301",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e01",
  description:
    "Captain Archer and his crew set out to gain information about the mysterious and antagonistic Xindi race.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 1,
  publishedAt: "2003-09-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15605",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/1",
    },
  ],
  title: "The Xindi",
  episodeType: "standard",
  stillPath: "/4SMC3iSAFhSUtsHbSMqBnbNtMn0.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
