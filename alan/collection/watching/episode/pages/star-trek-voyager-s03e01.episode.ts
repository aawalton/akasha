import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e01 = {
  id: "01a18853-ac8b-73f7-88a6-6654141ce613",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e01",
  description:
    "Stardate: 50023.4. Voyager is captured by the Kazon and the crew are dumped on a planet in its early stages of evolution.  As only Tom Paris and Lon Suder have evaded capture, it's up to them and the EMH to come up with a plan to retake the ship.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 1,
  publishedAt: "1996-09-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113157",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/1",
    },
  ],
  title: "Basics (2)",
  episodeType: "standard",
  stillPath: "/6293mSmmeA9V1hPIvrLFQtswlaV.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
