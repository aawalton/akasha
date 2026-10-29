import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e01 = {
  id: "01a1887f-e188-7a41-a95f-3ed74d0969b8",
  type: "page-type/episode",
  slug: "star-trek-2-s02e01",
  description: "First Officer Spock returns to his home world for a brutal Vulcan mating ritual.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-2"],
  position: 1,
  publishedAt: "1967-09-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13987",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/1",
    },
  ],
  title: "Amok Time",
  episodeType: "standard",
  stillPath: "/8tZghTuANWGrZG2MB630M1AiGYQ.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
