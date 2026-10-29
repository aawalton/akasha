import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS02e10 = {
  id: "01a18849-3528-7aff-90db-1e841bd61388",
  type: "page-type/episode",
  slug: "good-witch-s02e10",
  description:
    "After Cassie reaches a decision about her future, Middleton needs a touch of her magic when the Lights Festival threatens to go dark.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-2"],
  position: 10,
  publishedAt: "2016-06-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1187218",
      externalLink: "https://www.themoviedb.org/tv/61864/season/2/episode/10",
    },
  ],
  title: "A Perfect Match Pt. 2",
  episodeType: "finale",
  stillPath: "/aP26wncwz8ePd3c3q1KzK0J1IVu.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
