import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const pushingDaisiesS01e05 = {
  id: "01a1887f-251c-72a4-af16-173916b6eb33",
  type: "page-type/episode",
  slug: "pushing-daisies-s01e05",
  description:
    'In this Halloween episode, Emerson and Olive track down "the ghost" who\'s been killing the jockeys at the old race arena where Olive used to race as a former jockey herself. With help from Ned and Chuck, they try to solve the big mystery.',
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/pushing-daisies-season-1"],
  position: 5,
  publishedAt: "2007-10-31",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "364439",
      externalLink: "https://www.themoviedb.org/tv/5639/season/1/episode/5",
    },
  ],
  title: "Girth",
  episodeType: "standard",
  stillPath: "/605MTtuJyFWvlzaaefQR7JoSEi3.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T16:29:56.379Z",
  updatedAt: "2026-10-29T16:29:56.379Z",
} as const satisfies Episode
