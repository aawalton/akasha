import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS03e01 = {
  id: "01a1887e-1e3e-74fa-b392-976d4007373e",
  type: "page-type/episode",
  slug: "castle-s03e01",
  description:
    "When Beckett and her team burst into an apartment on a murderer's trail, they see Castle standing over a dead woman's body holding a gun; Beckett arrests Castle as he asserts his innocence.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/castle-season-3"],
  position: 1,
  publishedAt: "2010-09-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64821",
      externalLink: "https://www.themoviedb.org/tv/1419/season/3/episode/1",
    },
  ],
  title: "A Deadly Affair",
  episodeType: "standard",
  stillPath: "/5SL4NYy3crJEAWZtLpTEGe8wd3T.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
