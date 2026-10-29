import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS07e11 = {
  id: "01a1887e-1e4a-7d96-a36b-db4756c7773c",
  type: "page-type/episode",
  slug: "castle-s07e11",
  description:
    "After being banned from the 12th precinct, Castle works his first case as a private investigator.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/castle-season-7"],
  position: 11,
  publishedAt: "2015-01-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1023399",
      externalLink: "https://www.themoviedb.org/tv/1419/season/7/episode/11",
    },
  ],
  title: "Castle, P.I.",
  episodeType: "standard",
  stillPath: "/571VuCR4W10Jh50YUgdWEycLP4u.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
