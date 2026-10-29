import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS13e17 = {
  id: "01a18844-d7f7-7445-8a21-a78dac2b93b6",
  type: "page-type/episode",
  slug: "criminal-minds-s13e17",
  description:
    "The BAU is called to Oklahoma to investigate a murderous clown terrorizing the sleepy town of Guymon.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-13"],
  position: 17,
  publishedAt: "2018-03-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1436925",
      externalLink: "https://www.themoviedb.org/tv/4057/season/13/episode/17",
    },
  ],
  title: "The Capilanos",
  episodeType: "standard",
  stillPath: "/gHnvgH9CNrfrdth5IRQVscfZmcD.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
