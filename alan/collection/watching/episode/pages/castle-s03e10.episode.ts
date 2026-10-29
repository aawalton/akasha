import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS03e10 = {
  id: "01a1887e-1e3f-76ff-8bf1-69ab5f83f7f9",
  type: "page-type/episode",
  slug: "castle-s03e10",
  description:
    "Castle and Beckett investigate the murder of a dockworker turned bar owner who's body is found floating in the East River. In the process of the investigation they uncover a secret buried since the days of Prohibition.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/castle-season-3"],
  position: 10,
  publishedAt: "2010-12-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64817",
      externalLink: "https://www.themoviedb.org/tv/1419/season/3/episode/10",
    },
  ],
  title: "Last Call",
  episodeType: "mid-season",
  stillPath: "/e2q36iNQW1BDvH1IRFuMsqX2uvt.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
