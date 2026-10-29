import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS04e01 = {
  id: "01a18852-d433-780a-b520-cd17dc9d33b0",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s04e01",
  description:
    "Archer and the NX-01 find themselves in Earth's past, with events of World War II altered by the Temporal Cold War.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-4"],
  position: 1,
  publishedAt: "2004-10-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15613",
      externalLink: "https://www.themoviedb.org/tv/314/season/4/episode/1",
    },
  ],
  title: "Storm Front (1)",
  episodeType: "standard",
  stillPath: "/jg2uE3OkURrjKywB0Bys5h9r5Nu.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
