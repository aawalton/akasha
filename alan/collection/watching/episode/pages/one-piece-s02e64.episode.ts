import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const onePieceS02e64 = {
  id: "01a18850-0fcc-79e1-a41f-bb62c2023f7e",
  type: "page-type/episode",
  slug: "one-piece-s02e64",
  description:
    "Luffy and friends arrive at Whisky Peak, a town of pirate-lovers who hold them a feast.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/one-piece-season-2"],
  position: 64,
  publishedAt: "2001-04-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1146418",
      externalLink: "https://www.themoviedb.org/tv/37854/season/2/episode/64",
    },
  ],
  title: "A Town that Welcomes Pirates? Setting Foot on Whisky Peak!",
  episodeType: "standard",
  stillPath: "/6VcJfKCVSewtsTL1SYMajdeBi90.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:38:30.731Z",
  updatedAt: "2026-10-29T15:38:30.731Z",
} as const satisfies Episode
