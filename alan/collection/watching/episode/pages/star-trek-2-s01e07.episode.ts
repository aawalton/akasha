import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e07 = {
  id: "01a1887f-e186-78ac-bf6b-2f80bd32eb28",
  type: "page-type/episode",
  slug: "star-trek-2-s01e07",
  description:
    "Helping nurse Christine Chapel search for her fiancé, the Enterprise finds a detached Dr. Korby working on a plan to create Android duplicates of key figures, beginning with James Kirk.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 7,
  publishedAt: "1966-10-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13959",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/7",
    },
  ],
  title: "What Are Little Girls Made Of?",
  episodeType: "standard",
  stillPath: "/eKslNcmjg34ruuCyD4RFRhG6qoh.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
