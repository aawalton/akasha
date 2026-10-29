import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS01e10 = {
  id: "01a18852-d42f-78b5-8477-7a2f007b3f1d",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s01e10",
  description:
    "The Enterprise crew is dispatched by Starfleet Command to assist Fortunate, a human freight vessel that has been attacked by Nausicaan pirates. On arriving, they are surprised to find that Fortunate's crew is resistant to Archer's efforts to help them and determined to seek revenge against their attackers, no matter the repercussions.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-1"],
  position: 10,
  publishedAt: "2001-11-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15546",
      externalLink: "https://www.themoviedb.org/tv/314/season/1/episode/10",
    },
  ],
  title: "Fortunate Son",
  episodeType: "standard",
  stillPath: "/pvbchZuvGUurZuuhPNxOFWBKpmw.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
