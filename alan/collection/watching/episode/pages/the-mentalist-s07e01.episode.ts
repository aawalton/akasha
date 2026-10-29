import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS07e01 = {
  id: "01a18880-75ec-7c5b-ada9-c92fe5b47f22",
  type: "page-type/episode",
  slug: "the-mentalist-s07e01",
  description:
    "Jane and Lisbon decide to keep their new relationship a secret from  their colleagues as they investigate the murder of an undercover agent.  Also, young, ambitious agent Michelle Vega joins the team.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-mentalist-season-7"],
  position: 1,
  publishedAt: "2014-11-30",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1009454",
      externalLink: "https://www.themoviedb.org/tv/5920/season/7/episode/1",
    },
  ],
  title: "Nothing But Blue Skies",
  episodeType: "standard",
  stillPath: "/tOXSPiCbxWbXKROy5sVPVPQyls2.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
