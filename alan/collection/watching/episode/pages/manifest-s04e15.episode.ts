import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const manifestS04e15 = {
  id: "01a1884a-400c-78bb-adac-28b967645287",
  type: "page-type/episode",
  slug: "manifest-s04e15",
  description:
    "Desperate to stop Angelina, Ben makes a risky move that yields unexpected consequences. A family emergency sends Michaela in a different direction.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/manifest-season-4"],
  position: 15,
  publishedAt: "2023-06-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4350227",
      externalLink: "https://www.themoviedb.org/tv/79696/season/4/episode/15",
    },
  ],
  title: "Throttle",
  episodeType: "standard",
  stillPath: "/35XYHAIf2MT6NFnevgTNT3LHOBC.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:32:09.865Z",
  updatedAt: "2026-10-29T15:32:09.865Z",
} as const satisfies Episode
