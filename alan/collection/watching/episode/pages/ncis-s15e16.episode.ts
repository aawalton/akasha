import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e16 = {
  id: "01a1884b-ef77-75e4-be11-4030707ce883",
  type: "page-type/episode",
  slug: "ncis-s15e16",
  description:
    "Gibbs and the team work to clear the name of retired Marine Sergeant John Ross when cyanide is found in one of the hundreds of care packages he sends to active-duty Marines.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 16,
  publishedAt: "2018-03-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1431928",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/16",
    },
  ],
  title: "Handle with Care",
  episodeType: "standard",
  stillPath: "/8XvpdgFIgXWpdrBEZwWCDw8SQ1o.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
