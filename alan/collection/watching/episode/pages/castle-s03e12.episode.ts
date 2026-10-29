import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS03e12 = {
  id: "01a1887e-1e3f-7ff9-bc0d-d9440830e68a",
  type: "page-type/episode",
  slug: "castle-s03e12",
  description:
    "Castle and Beckett investigate the murder of the owner of a historic magic shop found dead in a Houdini's water torture tank.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/castle-season-3"],
  position: 12,
  publishedAt: "2011-01-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64819",
      externalLink: "https://www.themoviedb.org/tv/1419/season/3/episode/12",
    },
  ],
  title: "Poof! You're Dead",
  episodeType: "standard",
  stillPath: "/jnjx297QI9EWUz4c8yoRNL9Uj53.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
