import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e13 = {
  id: "01a1887f-e18a-783b-8ee6-d892307578a5",
  type: "page-type/episode",
  slug: "star-trek-2-s03e13",
  description:
    "The USS Enterprise ferries a spoiled princess whose betrothal to a royal Troyian is hoped will bring peace to a star system at war.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 13,
  publishedAt: "1968-12-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14012",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/13",
    },
  ],
  title: "Elaan of Troyius",
  episodeType: "standard",
  stillPath: "/bpTQ5QjWsmV9mdCAZMAdlHsiJWp.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
