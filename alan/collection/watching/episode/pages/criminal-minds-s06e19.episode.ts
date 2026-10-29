import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS06e19 = {
  id: "01a18844-d7ed-7c01-bf51-7318fb77360b",
  type: "page-type/episode",
  slug: "criminal-minds-s06e19",
  description:
    "The BAU travels to Portland to investigate a suspected gang of murderers targeting a new victim each night.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-6"],
  position: 19,
  publishedAt: "2011-03-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283327",
      externalLink: "https://www.themoviedb.org/tv/4057/season/6/episode/19",
    },
  ],
  title: "With Friends Like These...",
  episodeType: "standard",
  stillPath: "/nioierZccURSh06TIo2vCchLTni.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
