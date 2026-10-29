import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS05e11 = {
  id: "01a18854-50ad-70fb-b363-e5e46f9cb6fe",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s05e11",
  description:
    "After a comet damages their shuttle, R2-D2, Colonel Gascon, and the other droids crash on a desolate planet where they must make their way across a bewildering expanse of emptiness to carry out their mission.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-5"],
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
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
