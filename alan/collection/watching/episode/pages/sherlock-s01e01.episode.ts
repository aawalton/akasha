import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sherlockS01e01 = {
  id: "01a1887f-adef-7b3d-a12d-faa68d0f5123",
  type: "page-type/episode",
  slug: "sherlock-s01e01",
  description:
    "A war hero, invalided home from Afghanistan, meets a strange but charismatic genius who is looking for a flatmate; it is London, 2010, and Dr Watson and Sherlock Holmes are meeting for the first time. A string of impossible suicides has Scotland Yard baffled - and only one man can help.",
  ownLength: 88,
  ownProgress: 88,
  partOfCollections: ["season/sherlock-season-1"],
  position: 1,
  publishedAt: "2010-07-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "578715",
      externalLink: "https://www.themoviedb.org/tv/19885/season/1/episode/1",
    },
  ],
  title: "A Study in Pink",
  episodeType: "standard",
  stillPath: "/u8xvgVzTQjAeRu68sI9JJHeQSuA.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T16:30:31.407Z",
  updatedAt: "2026-10-29T16:30:31.407Z",
} as const satisfies Episode
