import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS07e04 = {
  id: "01a18857-c36c-72aa-9b84-bffed0dbcb70",
  type: "page-type/episode",
  slug: "the-office-s07e04",
  description:
    "Michael, believing he has herpes, contacts all his ex-girlfriends, including Jan and Holly. Andy tries to play on Erin’s compassionate side by holding a sex education meeting for the office.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-7"],
  position: 4,
  publishedAt: "2010-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170269",
      externalLink: "https://www.themoviedb.org/tv/2316/season/7/episode/4",
    },
  ],
  title: "Sex Ed",
  episodeType: "standard",
  stillPath: "/cTnT11ycmBXEufPdMSfikF6UUkn.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
