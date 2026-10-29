import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS04e03 = {
  id: "01a18852-d433-7831-87c0-4b1aea811533",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s04e03",
  description:
    "Once the NX-01 finally returns to Earth, the weary crewmen face repercussions of their journeys, both positive and negative.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-4"],
  position: 3,
  publishedAt: "2004-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15617",
      externalLink: "https://www.themoviedb.org/tv/314/season/4/episode/3",
    },
  ],
  title: "Home",
  episodeType: "standard",
  stillPath: "/sFpWwimrV9XAC26MGcIJnrV8C1V.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
