import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e11 = {
  id: "01a1884b-ef76-7caf-920d-a26ac824dee5",
  type: "page-type/episode",
  slug: "ncis-s15e11",
  description:
    "Torres and Bishop go undercover as a criminal couple available for hire, during an NCIS sting operation tracking illegal drug-running out of the Norfolk civilian marina.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 11,
  publishedAt: "2018-01-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1405275",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/11",
    },
  ],
  title: "High Tide",
  episodeType: "standard",
  stillPath: "/4rOHgKH1GuLGOeWEF03NZlPllok.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
