import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS02e04 = {
  id: "01a18859-6798-7835-99b2-df037b5d9689",
  type: "page-type/episode",
  slug: "upload-s02e04",
  description:
    "Nora's loyalties are stressed as she is called upon to take revolutionary action. Nathan's visiting family prompts him to consider what he wants out of his afterlife. Luke invents a new sport.",
  ownLength: 31,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-2"],
  position: 4,
  publishedAt: "2022-03-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3505480",
      externalLink: "https://www.themoviedb.org/tv/86248/season/2/episode/4",
    },
  ],
  title: "Family Day",
  episodeType: "standard",
  stillPath: "/cLD2hncT0OOcj8fFxiyVDucTffd.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
