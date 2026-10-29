import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS03e13 = {
  id: "01a1884b-ef65-717b-8f01-5ab926228f96",
  type: "page-type/episode",
  slug: "ncis-s03e13",
  description:
    "When a Lt. Commander in charge of a shipment of fuel rods for nuclear power stations disappears, the NCIS team are called in. The team must solve the case in time, before the person who kidnapped the Commander finds out the secret location of the fuel rods or harms the Commander.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-3"],
  position: 13,
  publishedAt: "2006-01-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334529",
      externalLink: "https://www.themoviedb.org/tv/4614/season/3/episode/13",
    },
  ],
  title: "Deception",
  episodeType: "standard",
  stillPath: "/jrhhfxkEX47ejuWZWyLRPg6qsJA.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
