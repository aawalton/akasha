import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS04e22 = {
  id: "01a18855-67eb-753d-a179-bfc833c57915",
  type: "page-type/episode",
  slug: "steven-universe-s04e22",
  description: "Steven, Lars and Sadie get invited to a party with the Cool Kids.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-4"],
  position: 22,
  publishedAt: "2017-05-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1303982",
      externalLink: "https://www.themoviedb.org/tv/61175/season/4/episode/22",
    },
  ],
  title: "The Good Lars",
  episodeType: "standard",
  stillPath: "/bE6zUSncc5TPdbjEechWL05Tx8a.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
