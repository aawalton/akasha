import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS04e04 = {
  id: "01a183d4-acc6-7168-abc1-eff5d1939a14",
  type: "page-type/episode",
  slug: "my-hero-academia-s04e04",
  description:
    "Izuku’s mind is swirling with feelings from his work study, so he goes and talks to All Might about it and learns about All Might’s fate.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-4"],
  position: 4,
  publishedAt: "2019-11-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1958018",
      externalLink: "https://www.themoviedb.org/tv/65930/season/4/episode/4",
    },
  ],
  title: "Fighting Fate",
  episodeType: "standard",
  stillPath: "/hPtozuYkTRt0vXl5v4IdKUshXxq.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
