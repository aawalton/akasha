import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS05e13 = {
  id: "01a18844-d7eb-7957-8015-4ca557a5bb0a",
  type: "page-type/episode",
  slug: "criminal-minds-s05e13",
  description:
    "A rash of startling teen suicides in a small Wyoming town is the focus of a BAU investigation.",
  ownLength: 40,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-5"],
  position: 13,
  publishedAt: "2010-01-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283251",
      externalLink: "https://www.themoviedb.org/tv/4057/season/5/episode/13",
    },
  ],
  title: "Risky Business",
  episodeType: "standard",
  stillPath: "/q7nfYwohpo1sTrE32A3JvfEtSnV.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
