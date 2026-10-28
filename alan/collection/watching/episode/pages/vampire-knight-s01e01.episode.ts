import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const vampireKnightS01e01 = {
  id: "01a183d8-f257-7b87-92f4-6e092a4ed326",
  type: "page-type/episode",
  slug: "vampire-knight-s01e01",
  description:
    "Cross Academy has two sessions, the Day Class and the Night Class; the latter consists of students who are beautiful, intelligent ... and vampires!",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/vampire-knight-season-1"],
  position: 1,
  publishedAt: "2008-04-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "553023",
      externalLink: "https://www.themoviedb.org/tv/17149/season/1/episode/1",
    },
  ],
  title: "Night of Vampires",
  episodeType: "standard",
  stillPath: "/2CmgqE92zjUISmfhlsyShwAOOG5.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:49:55.542Z",
  updatedAt: "2026-10-28T18:49:55.542Z",
} as const satisfies Episode
