import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS03e02 = {
  id: "01a1887e-1e3e-7db8-a8d5-282276930647",
  type: "page-type/episode",
  slug: "castle-s03e02",
  description:
    "Beckett and Castle search for a psychic's killer while debating the existence of extrasensory abilities.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/castle-season-3"],
  position: 2,
  publishedAt: "2010-09-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64823",
      externalLink: "https://www.themoviedb.org/tv/1419/season/3/episode/2",
    },
  ],
  title: "He's Dead, She's Dead",
  episodeType: "standard",
  stillPath: "/12Ci2cN3dGwNCzY6c40HMj5NBw5.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
