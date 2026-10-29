import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS03e03 = {
  id: "01a18857-7c29-7578-9d18-68c59630c368",
  type: "page-type/episode",
  slug: "the-mandalorian-s03e03",
  description: "On Coruscant, former Imperials find amnesty in the New Republic.",
  ownLength: 59,
  ownProgress: 0,
  partOfCollections: ["season/the-mandalorian-season-3"],
  position: 3,
  publishedAt: "2023-03-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4237591",
      externalLink: "https://www.themoviedb.org/tv/82856/season/3/episode/3",
    },
  ],
  title: "Chapter 19: The Convert",
  episodeType: "standard",
  stillPath: "/zgj0iZUYNIZh0NbPVdNEdTacfwv.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:46:37.224Z",
  updatedAt: "2026-10-29T15:46:37.224Z",
} as const satisfies Episode
