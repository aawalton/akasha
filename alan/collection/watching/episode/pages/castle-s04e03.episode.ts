import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS04e03 = {
  id: "01a1887e-1e40-7744-994b-9c1ba85db3a2",
  type: "page-type/episode",
  slug: "castle-s04e03",
  description:
    "A murder scene complete with lots of blood but no victim and high tech life-extension science are all part of the investigation as Castle and Beckett try to solve a murder without a body. Meanwhile, Alexis waits to hear news about her application to Stanford",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/castle-season-4"],
  position: 3,
  publishedAt: "2011-10-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64842",
      externalLink: "https://www.themoviedb.org/tv/1419/season/4/episode/3",
    },
  ],
  title: "Head Case",
  episodeType: "standard",
  stillPath: "/ps9gT5GUzI891BjMnCXXjbkDfMz.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
