import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS05e01 = {
  id: "01a18856-4002-7dd7-9689-c011c86596d5",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s05e01",
  description:
    "Penny is worried with how damaged her friendship with the guys will be in the aftermath of her sleeping with Raj while Sheldon becomes the leader of the paintball team.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-5"],
  position: 1,
  publishedAt: "2011-09-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64719",
      externalLink: "https://www.themoviedb.org/tv/1418/season/5/episode/1",
    },
  ],
  title: "The Skank Reflex Analysis",
  episodeType: "standard",
  stillPath: "/kSGRUzwEeW4LMOPuYKQloqCVEhH.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
