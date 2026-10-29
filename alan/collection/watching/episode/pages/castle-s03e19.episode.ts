import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS03e19 = {
  id: "01a1887e-1e3f-7c26-8c97-917ad08917b1",
  type: "page-type/episode",
  slug: "castle-s03e19",
  description:
    "During the high profile trial of a murdered socialite, a juror tumbles out of the jury box....dead.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/castle-season-3"],
  position: 19,
  publishedAt: "2011-03-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64833",
      externalLink: "https://www.themoviedb.org/tv/1419/season/3/episode/19",
    },
  ],
  title: "Law & Murder",
  episodeType: "standard",
  stillPath: "/7KbJ9tuQhhE258Xd0pBXB7iwgBv.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
