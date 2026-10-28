import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const attackOnTitanS04e06 = {
  id: "01a183d1-6a26-787b-ad3b-23ed84c96421",
  type: "page-type/episode",
  slug: "attack-on-titan-s04e06",
  description:
    "Eren's rampage is thwarted by the War Hammer Titan whose tenacity leaves him stumped. With Marley's military joining the fight, he'll be hard-pressed to survive on his own.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/attack-on-titan-season-4"],
  position: 6,
  publishedAt: "2021-01-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2548774",
      externalLink: "https://www.themoviedb.org/tv/1429/season/4/episode/6",
    },
  ],
  title: "The War Hammer Titan",
  episodeType: "standard",
  stillPath: "/fYwa43vhmIEhTrrrNUJ13LA8YsG.jpg",
  voteAverage: 9.1,
  createdAt: "2026-10-28T18:41:41.918Z",
  updatedAt: "2026-10-28T18:41:41.918Z",
} as const satisfies Episode
