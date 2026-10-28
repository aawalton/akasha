import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS02e07 = {
  id: "01a183d4-acc3-7506-a061-988c5b6e8c9b",
  type: "page-type/episode",
  slug: "my-hero-academia-s02e07",
  description:
    "Izuku is up against Shinso in the first match of the finals, but can he overcome Shinso’s Quirk to advance to the next round?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-2"],
  position: 7,
  publishedAt: "2017-05-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1315142",
      externalLink: "https://www.themoviedb.org/tv/65930/season/2/episode/7",
    },
  ],
  title: "Victory or Defeat",
  episodeType: "standard",
  stillPath: "/c7QUEodtTFbEuwRWhWruZBQg9tc.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
