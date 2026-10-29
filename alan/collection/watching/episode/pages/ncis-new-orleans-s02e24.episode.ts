import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS02e24 = {
  id: "01a1884b-3017-78cc-aa90-5ebb75ac0654",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s02e24",
  description:
    "The NCIS team uncovers a mole in the ranks while working with the Department of Homeland Security to locate 900 missing pounds of explosives that pose an imminent threat to New Orleans.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-2"],
  position: 24,
  publishedAt: "2016-05-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1194428",
      externalLink: "https://www.themoviedb.org/tv/61387/season/2/episode/24",
    },
  ],
  title: "Sleeping with the Enemy",
  episodeType: "finale",
  stillPath: "/uddiJfEjqVFulyZz41kLJM7Pvq7.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
