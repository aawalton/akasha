import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS04e07 = {
  id: "01a18852-d433-7cd0-8dfa-d8066c3714df",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s04e07",
  description:
    "Earth's embassy on Vulcan is bombed, and the ensuing investigation puts Archer and T'Pol on the trail of a Vulcan religious faction hiding in a treacherous desert.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-4"],
  position: 7,
  publishedAt: "2004-11-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15629",
      externalLink: "https://www.themoviedb.org/tv/314/season/4/episode/7",
    },
  ],
  title: "The Forge (1)",
  episodeType: "standard",
  stillPath: "/9wBKvORqHHMH0bhdHlbwkczcjdj.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
