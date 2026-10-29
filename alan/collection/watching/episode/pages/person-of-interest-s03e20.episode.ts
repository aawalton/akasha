import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS03e20 = {
  id: "01a18851-3df6-7b08-8188-df69ac356dc1",
  type: "page-type/episode",
  slug: "person-of-interest-s03e20",
  description:
    "Reese poses as a Secret Service agent to get close to the latest POI, a U.S. congressman who may hold the key to derailing Decima’s plans to bring a second Machine online.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-3"],
  position: 20,
  publishedAt: "2014-04-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "973922",
      externalLink: "https://www.themoviedb.org/tv/1411/season/3/episode/20",
    },
  ],
  title: "Death Benefit",
  episodeType: "standard",
  stillPath: "/mbZeDbD2lXofRbsplpFxWMRaSKX.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
