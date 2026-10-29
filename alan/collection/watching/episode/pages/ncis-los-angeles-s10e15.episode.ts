import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS10e15 = {
  id: "01a1884a-e0f3-7921-82b9-3b9c4af24626",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s10e15",
  description:
    "As the team continues to search for a terrorist cell in Los Angeles, Callen and Sam remain trapped in a movie theater after multiple bombs have detonated and every remaining exit is wired with explosives.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-10"],
  position: 15,
  publishedAt: "2019-02-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1687276",
      externalLink: "https://www.themoviedb.org/tv/17610/season/10/episode/15",
    },
  ],
  title: "Smokescreen, Part II",
  episodeType: "standard",
  stillPath: "/p1WdgaGmqzIjzfe7WXSQXc7Z1oj.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
