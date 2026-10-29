import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e25 = {
  id: "01a18853-ac8d-7058-bc6c-3d310be557a0",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e25",
  description:
    "Stardate: 50953.4. B'Elanna Torres discovers a holodeck program where Chakotay and the Maquis rebel against Janeway.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 25,
  publishedAt: "1997-05-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113155",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/25",
    },
  ],
  title: "Worst Case Scenario",
  episodeType: "standard",
  stillPath: "/jqTXSIHanOtsQ1ibmgBH7g7AT9s.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
