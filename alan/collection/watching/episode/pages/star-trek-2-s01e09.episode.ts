import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e09 = {
  id: "01a1887f-e186-74b8-8cfe-d054b38e276c",
  type: "page-type/episode",
  slug: "star-trek-2-s01e09",
  description:
    "When a wild eyed maniac escaping from the Tantalus Penal Colony turns out to be one of the psychiatric staff, Kirk investigates the institution and discovers a chilling exercise in mind control.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 9,
  publishedAt: "1966-11-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13960",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/9",
    },
  ],
  title: "Dagger of the Mind",
  episodeType: "standard",
  stillPath: "/3rEEgwt3spqlZ0OkljfUHrhOhvl.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
