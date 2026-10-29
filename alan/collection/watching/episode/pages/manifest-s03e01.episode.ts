import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const manifestS03e01 = {
  id: "01a1884a-400b-7f7d-92fb-11211d2eeeb0",
  type: "page-type/episode",
  slug: "manifest-s03e01",
  description:
    "Ben heads on an international mission with Vance to seek a clue that may finally unlock the mystery of Flight 828. An intense calling leads newlyweds Michaela and Zeke on an adventure of their own. Saanvi attempts to forget her past sins.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/manifest-season-3"],
  position: 1,
  publishedAt: "2021-04-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2539903",
      externalLink: "https://www.themoviedb.org/tv/79696/season/3/episode/1",
    },
  ],
  title: "Tailfin",
  episodeType: "standard",
  stillPath: "/mXwCIgBnpHdmMPu7RIUNwqXQM4v.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:32:09.865Z",
  updatedAt: "2026-10-29T15:32:09.865Z",
} as const satisfies Episode
