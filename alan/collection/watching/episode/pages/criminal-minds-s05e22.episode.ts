import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS05e22 = {
  id: "01a18844-d7ec-7f37-b9c0-fbc1330eafae",
  type: "page-type/episode",
  slug: "criminal-minds-s05e22",
  description:
    'The BAU team profiles a serial killer who uses the Internet as his hunting ground, bringing a whole meaning to the term "social networking".',
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-5"],
  position: 22,
  publishedAt: "2010-05-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283276",
      externalLink: "https://www.themoviedb.org/tv/4057/season/5/episode/22",
    },
  ],
  title: "The Internet Is Forever",
  episodeType: "standard",
  stillPath: "/xdPAPJVMsTtW6CdnumBq44DxBY8.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
