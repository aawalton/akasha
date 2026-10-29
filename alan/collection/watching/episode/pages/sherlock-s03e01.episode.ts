import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sherlockS03e01 = {
  id: "01a1887f-adf0-7647-be93-089d898e9dbe",
  type: "page-type/episode",
  slug: "sherlock-s03e01",
  description:
    "Two years on from reports of his Reichenbach Fall demise, Sherlock resurfaces as London comes under threat of a huge terrorist attack. John, though, has mixed feelings about his friend's shocking return.",
  ownLength: 87,
  ownProgress: 87,
  partOfCollections: ["season/sherlock-season-3"],
  position: 1,
  publishedAt: "2014-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "578721",
      externalLink: "https://www.themoviedb.org/tv/19885/season/3/episode/1",
    },
  ],
  title: "The Empty Hearse",
  episodeType: "standard",
  stillPath: "/zXsOogQ8BVyvWUR2zgs6NBxkReX.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:30:31.407Z",
  updatedAt: "2026-10-29T16:30:31.407Z",
} as const satisfies Episode
