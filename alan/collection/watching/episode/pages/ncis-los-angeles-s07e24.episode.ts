import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS07e24 = {
  id: "01a1884a-e0f0-7bdd-8346-a2eba3dfdf40",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s07e24",
  description:
    "Sam receives a distress code from Aiden saying that his school is being taken over by an extremist group.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-7"],
  position: 24,
  publishedAt: "2016-05-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1185707",
      externalLink: "https://www.themoviedb.org/tv/17610/season/7/episode/24",
    },
  ],
  title: "Talion",
  episodeType: "finale",
  stillPath: "/o1LJd7QBaHQD2thbAw715AdHq91.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
