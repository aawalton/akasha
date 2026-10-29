import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS01e22 = {
  id: "01a18852-d430-7b76-8cc4-75c4b6b8e46e",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s01e22",
  description:
    "A strange, alien creature comes aboard Enterprise, and captures several crew members in its cocoon-like web. With her crewmates' lives in jeopardy, Hoshi faces her biggest challenge yet, in trying to communicate with the lifeform, in order to return it to its home planet.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-1"],
  position: 22,
  publishedAt: "2002-05-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15557",
      externalLink: "https://www.themoviedb.org/tv/314/season/1/episode/22",
    },
  ],
  title: "Vox Sola",
  episodeType: "standard",
  stillPath: "/wEKGloDAIp18hpeglOFuxnIgLrN.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
