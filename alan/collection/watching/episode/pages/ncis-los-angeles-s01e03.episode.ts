import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS01e03 = {
  id: "01a1884a-e0e8-722a-b67c-37ac9f277cf4",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s01e03",
  description:
    "The team is assigned to track down a missing unmanned aerial vehicle (UAV) after it is compromised during a training exercise killing a marine before it disappears.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-1"],
  position: 3,
  publishedAt: "2009-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557277",
      externalLink: "https://www.themoviedb.org/tv/17610/season/1/episode/3",
    },
  ],
  title: "Predator",
  episodeType: "standard",
  stillPath: "/w3pUuXANJLp1MFL7iln4AYdrkM4.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
