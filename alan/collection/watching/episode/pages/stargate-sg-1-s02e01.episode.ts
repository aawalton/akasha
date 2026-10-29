import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateSg1S02e01 = {
  id: "01a18854-f3f3-762f-a500-c6d7655e76d7",
  type: "page-type/episode",
  slug: "stargate-sg-1-s02e01",
  description:
    "With SG-1 trapped on Klorel's ship, it seems that Earth is doomed as the Pyramid Ships prepare to destroy Earth.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-sg-1-season-2"],
  position: 1,
  publishedAt: "1998-06-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335861",
      externalLink: "https://www.themoviedb.org/tv/4629/season/2/episode/1",
    },
  ],
  title: "The Serpent's Lair (3)",
  episodeType: "standard",
  stillPath: "/43JtHu2ssBOeKEeqKuIKwe8OPKH.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:43:51.281Z",
  updatedAt: "2026-10-29T15:43:51.281Z",
} as const satisfies Episode
