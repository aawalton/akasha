import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS10e20 = {
  id: "01a18844-d7f3-7ec4-8581-a154b05defc4",
  type: "page-type/episode",
  slug: "criminal-minds-s10e20",
  description:
    "When a Maryland family is found murdered at their dining room table, the team tracks down other family members and friends to uncover secrets that may have led to it. Also, Hotch must try to make peace with his father-in-law, Roy, after discovering he’s been diagnosed with Alzheimer’s.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-10"],
  position: 20,
  publishedAt: "2015-04-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1049359",
      externalLink: "https://www.themoviedb.org/tv/4057/season/10/episode/20",
    },
  ],
  title: "A Place at the Table",
  episodeType: "standard",
  stillPath: "/4S5T3ICLOaTTvq83myfNVfcv2qS.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
