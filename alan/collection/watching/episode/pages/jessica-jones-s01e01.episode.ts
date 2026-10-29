import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const jessicaJonesS01e01 = {
  id: "01a18849-e9ab-71bd-83be-9a2fb746d84c",
  type: "page-type/episode",
  slug: "jessica-jones-s01e01",
  description:
    "Jessica Jones is hired to find a pretty NYU student who's vanished, but it turns out to be more than a simple missing persons case.",
  ownLength: 53,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-jessica-jones-season-1"],
  position: 1,
  publishedAt: "2015-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1105754",
      externalLink: "https://www.themoviedb.org/tv/38472/season/1/episode/1",
    },
  ],
  title: "AKA Ladies Night",
  episodeType: "standard",
  stillPath: "/8sdMBGwHYW7UWrPv8c39w7VHj83.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:31:47.755Z",
  updatedAt: "2026-10-29T15:31:47.755Z",
} as const satisfies Episode
