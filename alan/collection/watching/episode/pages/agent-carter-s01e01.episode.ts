import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const agentCarterS01e01 = {
  id: "01a1887d-8f10-79a4-a1ee-8caa87612bbc",
  type: "page-type/episode",
  slug: "agent-carter-s01e01",
  description:
    "In 1946, Peggy Carter is now a secretary for the Strategic Scientific Reserve. Howard Stark asks her for help when the country believes that he is selling deadly weapons to their enemies.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/marvel-s-agent-carter-season-1"],
  position: 1,
  publishedAt: "2015-01-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1013214",
      externalLink: "https://www.themoviedb.org/tv/61550/season/1/episode/1",
    },
  ],
  title: "Now Is Not the End",
  episodeType: "standard",
  stillPath: "/vElAbFDFXDG9ehuFyAeE6bnAd4U.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T16:28:12.432Z",
  updatedAt: "2026-10-29T16:28:12.432Z",
} as const satisfies Episode
