import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gravityFallsS02e09 = {
  id: "01a18849-545f-75fb-9d26-c78578293a2d",
  type: "page-type/episode",
  slug: "gravity-falls-s02e09",
  description:
    "Mabel takes matchmaking too far when she steals a love potion from a real Love God.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/gravity-falls-season-2"],
  position: 9,
  publishedAt: "2014-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1015152",
      externalLink: "https://www.themoviedb.org/tv/40075/season/2/episode/9",
    },
  ],
  title: "The Love God",
  episodeType: "standard",
  stillPath: "/qnuJLHlZIib8JJQPOEs2ueKG7sh.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:31:09.532Z",
  updatedAt: "2026-10-29T15:31:09.532Z",
} as const satisfies Episode
