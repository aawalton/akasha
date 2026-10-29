import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS04e02 = {
  id: "01a18852-d433-7948-87d8-f886af33ab56",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s04e02",
  description:
    "With Silik's help, Archer hones in on the temporal operative who altered Earth's past and threatens to destroy all of time.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-4"],
  position: 2,
  publishedAt: "2004-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15614",
      externalLink: "https://www.themoviedb.org/tv/314/season/4/episode/2",
    },
  ],
  title: "Storm Front (2)",
  episodeType: "standard",
  stillPath: "/77AzoFIR8xW7ie5Rf7qsCT3QVsW.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
