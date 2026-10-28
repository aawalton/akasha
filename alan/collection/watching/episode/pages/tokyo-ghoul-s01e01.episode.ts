import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const tokyoGhoulS01e01 = {
  id: "01a183d5-8607-7c56-8281-227f83dd3448",
  type: "page-type/episode",
  slug: "tokyo-ghoul-s01e01",
  description:
    'Amid news reports of "Ghoul" attacks nearby, Ken Kaneki points out Rize, a girl he is interested in, to his friend Hide at a local coffee shop. When Kaneki discovers the two share a favorite author, he asks her out. However, their date ends in tragedy!',
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/tokyo-ghoul-season-1"],
  position: 1,
  publishedAt: "2014-07-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1019299",
      externalLink: "https://www.themoviedb.org/tv/61374/season/1/episode/1",
    },
  ],
  title: "Tragedy",
  episodeType: "standard",
  stillPath: "/lmgWmpMd9XK7cgeqqrHLBfnplc1.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-28T18:46:11.206Z",
  updatedAt: "2026-10-28T18:46:11.206Z",
} as const satisfies Episode
