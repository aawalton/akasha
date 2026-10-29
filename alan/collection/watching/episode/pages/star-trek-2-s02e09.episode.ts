import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e09 = {
  id: "01a1887f-e188-73a1-b049-6c8a147f39aa",
  type: "page-type/episode",
  slug: "star-trek-2-s02e09",
  description:
    "A shuttle crew from the USS Enterprise encounters a man out of history and his mysterious alien companion.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-2"],
  position: 9,
  publishedAt: "1967-11-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13993",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/9",
    },
  ],
  title: "Metamorphosis",
  episodeType: "standard",
  stillPath: "/qTIyLFPxj46mPqomqcPgdSY9Yj6.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
