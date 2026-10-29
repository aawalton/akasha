import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS01e26 = {
  id: "01a18852-d430-7a5e-8dcd-541d6b858f76",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s01e26",
  description:
    "Starfleet orders Enterprise to return home when the crew seemingly causes the destruction of an alien planet. However, a visit from Crewman Daniels leads Archer to believe that this disaster was the plot of one of the factions from the temporal cold war.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-1"],
  position: 26,
  publishedAt: "2002-05-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15561",
      externalLink: "https://www.themoviedb.org/tv/314/season/1/episode/26",
    },
  ],
  title: "Shockwave (1)",
  episodeType: "finale",
  stillPath: "/2TkSclIk5dyFmwzYER9IM8w1y3t.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
