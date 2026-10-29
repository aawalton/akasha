import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS06e12 = {
  id: "01a18844-d7ed-7125-a52c-6c44397270c7",
  type: "page-type/episode",
  slug: "criminal-minds-s06e12",
  description:
    "A series of bizarre, ritualistic murders brings the team to Miami; Reid experiences hallucinations and blinding headaches.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-6"],
  position: 12,
  publishedAt: "2011-01-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283318",
      externalLink: "https://www.themoviedb.org/tv/4057/season/6/episode/12",
    },
  ],
  title: "Corazon",
  episodeType: "standard",
  stillPath: "/5IUsHDwwpD7xFzNiYQq8wvSsQFq.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
