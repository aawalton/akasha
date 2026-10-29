import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS03e02 = {
  id: "01a1884b-3018-7277-8594-f47cc4da641b",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s03e02",
  description:
    "Pride faces further backlash from the FBI when he helps former Navy Intelligence Analyst Elvis Bertrand, who is the lead suspect in a multiple homicide case.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-3"],
  position: 2,
  publishedAt: "2016-09-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1224208",
      externalLink: "https://www.themoviedb.org/tv/61387/season/3/episode/2",
    },
  ],
  title: "Suspicious Minds",
  episodeType: "standard",
  stillPath: "/tlxkhlhNpw70W46orgkdhwdkdzv.jpg",
  voteAverage: 5.5,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
