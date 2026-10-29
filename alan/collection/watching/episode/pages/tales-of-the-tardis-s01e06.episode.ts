import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const talesOfTheTardisS01e06 = {
  id: "01a18855-d686-7d71-926b-237a2859a191",
  type: "page-type/episode",
  slug: "tales-of-the-tardis-s01e06",
  description:
    "The Doctor and Ace meet again and remember their battle against an ancient evil in World War Two where a Viking curse is bringing the dead back to life.",
  ownLength: 111,
  ownProgress: 0,
  partOfCollections: ["season/tales-of-the-tardis-season-1"],
  position: 6,
  publishedAt: "2023-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4877019",
      externalLink: "https://www.themoviedb.org/tv/238486/season/1/episode/6",
    },
  ],
  title: "The Curse of Fenric",
  episodeType: "standard",
  stillPath: "/sVuae9fm57kAsoK5RRqdqazt0br.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:44:49.285Z",
  updatedAt: "2026-10-29T15:44:49.285Z",
} as const satisfies Episode
