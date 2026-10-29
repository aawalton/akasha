import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS05e07 = {
  id: "01a1887e-1e41-73b0-8261-07747c143b9f",
  type: "page-type/episode",
  slug: "castle-s05e07",
  description:
    "A documentary crew follows Castle, Beckett and the team as they investigate the murder of a rock band's lead guitarist.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/castle-season-5"],
  position: 7,
  publishedAt: "2012-11-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64870",
      externalLink: "https://www.themoviedb.org/tv/1419/season/5/episode/7",
    },
  ],
  title: "Swan Song",
  episodeType: "standard",
  stillPath: "/kqeJjcCEPW3S2jeHzmnVeTZjpSa.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
