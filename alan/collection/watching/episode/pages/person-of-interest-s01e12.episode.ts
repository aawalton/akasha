import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS01e12 = {
  id: "01a18851-3df3-7a19-9822-eddc692acc5d",
  type: "page-type/episode",
  slug: "person-of-interest-s01e12",
  description:
    "When Carter finally comes face-to-face with Reese, he urges her to join forces to help with their latest POI, a scrappy young woman from the wrong side of the tracks who turned her life around and became a lawyer.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-1"],
  position: 12,
  publishedAt: "2012-01-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64066",
      externalLink: "https://www.themoviedb.org/tv/1411/season/1/episode/12",
    },
  ],
  title: "Legacy",
  episodeType: "standard",
  stillPath: "/c3IJzqQNQ4JxoFbEeNNqew7OP3A.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
