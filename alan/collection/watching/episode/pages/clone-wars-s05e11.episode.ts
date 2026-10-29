import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS05e11 = {
  id: "01a18844-6111-74e0-b82e-fe390f95bcd6",
  type: "page-type/episode",
  slug: "clone-wars-s05e11",
  description:
    "After a comet damages their shuttle, R2-D2, Colonel Gascon, and the other droids crash on a desolate planet where they must make their way across a bewildering expanse of emptiness to carry out their mission.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/clone-wars-season-5"],
  position: 11,
  publishedAt: "2012-12-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010372",
      externalLink: "https://www.themoviedb.org/tv/4194/season/5/episode/11",
    },
  ],
  title: "A Sunny Day in the Void",
  episodeType: "standard",
  stillPath: "/cvgNxQVH9nzfm6TCzat87jAYFmJ.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
