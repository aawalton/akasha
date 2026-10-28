import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cyberpunkEdgerunnersS01e01 = {
  id: "01a183da-574f-7381-83a3-0dea4f2471d4",
  type: "page-type/episode",
  slug: "cyberpunk-edgerunners-s01e01",
  description:
    "After a night of streaming illegal braindance, David wakes up to reality: a rundown apartment with a broken washing machine and an overworked mother.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/cyberpunk-edgerunners-season-1"],
  position: 1,
  publishedAt: "2022-09-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2320905",
      externalLink: "https://www.themoviedb.org/tv/105248/season/1/episode/1",
    },
  ],
  title: "Let You Down",
  episodeType: "standard",
  stillPath: "/egBHU73t79tMg2qrqj3aJof1ibS.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-28T18:51:26.927Z",
  updatedAt: "2026-10-28T18:51:26.927Z",
} as const satisfies Episode
