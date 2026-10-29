import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e04 = {
  id: "01a1884b-ef76-73e5-a6fa-eb5f7fc33e56",
  type: "page-type/episode",
  slug: "ncis-s15e04",
  description:
    "NCIS Special Agent Jacqueline Sloane, a forensic psychologist, joins the team just as a horrific storm shuts down Washington, D.C. During the power outage, a sailor is kidnapped, and Torres and Bishop go out to sea to track evidence.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 4,
  publishedAt: "2017-10-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1372153",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/4",
    },
  ],
  title: "Skeleton Crew",
  episodeType: "standard",
  stillPath: "/rQcEq63U8qm21dLybSGm5HBdFuW.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
