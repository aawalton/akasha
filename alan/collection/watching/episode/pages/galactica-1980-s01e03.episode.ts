import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const galactica1980S01e03 = {
  id: "01a18848-eded-7d82-8f5b-18dc7c4fd5b5",
  type: "page-type/episode",
  slug: "galactica-1980-s01e03",
  description:
    "Xavier appears on Earth before the arrival of the Galactica and it is up to Tory and Dillon to stop his schemes before all hope for a future colony is lost.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/galactica-1980-season-1"],
  position: 3,
  publishedAt: "1980-02-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335320",
      externalLink: "https://www.themoviedb.org/tv/4621/season/1/episode/3",
    },
  ],
  title: "Galactica Discovers Earth (3)",
  episodeType: "standard",
  stillPath: "/25xY1dCxBG0HAPPu2BFSdgGSKFe.jpg",
  voteAverage: 4.1,
  createdAt: "2026-10-29T15:30:43.309Z",
  updatedAt: "2026-10-29T15:30:43.309Z",
} as const satisfies Episode
