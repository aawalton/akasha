import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS22e01 = {
  id: "01a18855-c2a1-7b32-bfe3-88cd9ff2f4f1",
  type: "page-type/episode",
  slug: "studio-c-s22e01",
  description:
    'A spaceship veers off course to settle a cosmic grudge. A man melts down over a brownie. A man launches a wild smear campaign. A family discovers dad\'s secret "death tape." An angel guides Naomi through Heaven. Rainn Wilson guest stars.',
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-22"],
  position: 1,
  publishedAt: "2026-04-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7070758",
      externalLink: "https://www.themoviedb.org/tv/68207/season/22/episode/1",
    },
  ],
  title: "I’m Dead Part 435 with Rainn Wilson",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
