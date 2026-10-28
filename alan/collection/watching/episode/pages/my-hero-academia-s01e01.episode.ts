import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS01e01 = {
  id: "01a183d4-acc2-7ead-a1c4-ffafee1e6211",
  type: "page-type/episode",
  slug: "my-hero-academia-s01e01",
  description:
    "Izuku Midoriya desperately wants to be a hero, but he is one of the few in his generation born without a Quirk. Will meeting the number one hero, All Might, change his fate?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-1"],
  position: 1,
  publishedAt: "2016-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1176693",
      externalLink: "https://www.themoviedb.org/tv/65930/season/1/episode/1",
    },
  ],
  title: "Izuku Midoriya: Origin",
  episodeType: "standard",
  stillPath: "/v8LeJjeJeyiZPqElnDG0FZQpABf.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
