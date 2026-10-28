import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theRisingOfTheShieldHeroS01e01 = {
  id: "01a183dd-d7e2-7f6a-8bb6-7763d43e3155",
  type: "page-type/episode",
  slug: "the-rising-of-the-shield-hero-s01e01",
  description:
    'College student Iwatani Naofumi is reading a book titled "The Records of the Four Cardinal Weapons" in the library when he is suddenly summoned to another world and told he has to save the world as the Shield Hero, one of the Four Cardinal Heroes. And one morning, he finds all his money and equipment gone.',
  ownLength: 47,
  ownProgress: 0,
  partOfCollections: ["season/the-rising-of-the-shield-hero-season-1"],
  position: 1,
  publishedAt: "2019-01-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1594353",
      externalLink: "https://www.themoviedb.org/tv/83095/season/1/episode/1",
    },
  ],
  title: "The Shield Hero",
  episodeType: "standard",
  stillPath: "/fY3CFbtAmNEW0eaKUoqAJy0j1kb.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-28T18:55:16.450Z",
  updatedAt: "2026-10-28T18:55:16.450Z",
} as const satisfies Episode
