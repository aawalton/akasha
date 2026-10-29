import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e17 = {
  id: "01a1884b-ef63-7248-acac-d56a484dda22",
  type: "page-type/episode",
  slug: "ncis-s01e17",
  description:
    "When the body of a sailor is found after a party in an illegal night club, the team investigate a number of possible leads - including blackmail and accidental death.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 17,
  publishedAt: "2004-03-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334446",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/17",
    },
  ],
  title: "The Truth Is Out There",
  episodeType: "standard",
  stillPath: "/l17opF8lneVr5hpya6guw69cFka.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
