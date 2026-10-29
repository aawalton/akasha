import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisSydneyS03e14 = {
  id: "01a1884b-6702-7c14-a750-b4fb1d311363",
  type: "page-type/episode",
  slug: "ncis-sydney-s03e14",
  description:
    "The team is drawn into the mystical world of fortune telling when a tarot card is found near a drowned U.S. Naval officer depicting the exact manner of his death.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-sydney-season-3"],
  position: 14,
  publishedAt: "2026-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7095302",
      externalLink: "https://www.themoviedb.org/tv/157950/season/3/episode/14",
    },
  ],
  title: "Death Card",
  episodeType: "standard",
  stillPath: "/1PetVt1UyNzCYRDKsz74THYyhv0.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T15:33:25.376Z",
  updatedAt: "2026-10-29T15:33:25.376Z",
} as const satisfies Episode
