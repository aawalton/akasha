import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS15e04 = {
  id: "01a18855-c29e-71ea-8d1f-c3030c069dbd",
  type: "page-type/episode",
  slug: "studio-c-s15e04",
  description:
    "Bob Iger reveals Disney’s newest live-action remake of Ratatouille. Loki interviews Doctor Strange. A driver claims his car turned invisible. Jason Gray finds a video he made in junior high school.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-15"],
  position: 4,
  publishedAt: "2022-04-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3750990",
      externalLink: "https://www.themoviedb.org/tv/68207/season/15/episode/4",
    },
  ],
  title: "Live Action Studio C",
  episodeType: "standard",
  stillPath: "/tcpg4CRqWL4VoQA8PbqQ5KvKRcy.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
