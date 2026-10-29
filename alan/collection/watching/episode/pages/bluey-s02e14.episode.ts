import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS02e14 = {
  id: "01a18843-d150-7041-a3c1-0e4dff4889a4",
  type: "page-type/episode",
  slug: "bluey-s02e14",
  description:
    "Bluey plays mum to a brood of bouncy balloons, including an irrepressible floater named Greenie. But she soon discovers that mothering is much harder than she imagined.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-2"],
  position: 14,
  publishedAt: "2020-03-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2204632",
      externalLink: "https://www.themoviedb.org/tv/82728/season/2/episode/14",
    },
  ],
  title: "Mum School",
  episodeType: "standard",
  stillPath: "/r2ha6ddJfZaYyhAw0P6TV0jPuFs.jpg",
  voteAverage: 5.7,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
