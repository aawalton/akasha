import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS07e01 = {
  id: "01a1884b-301e-73c7-b1f9-a30224f0f85a",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s07e01",
  description:
    "As New Orleans grapples with the effects of COVID-19, Pride sends Tammy and Carter to investigate a suspicious death aboard a humanitarian ship offshore, where they learn that some crew members are infected with the deadly disease.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-7"],
  position: 1,
  publishedAt: "2020-11-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2463075",
      externalLink: "https://www.themoviedb.org/tv/61387/season/7/episode/1",
    },
  ],
  title: "Something in the Air (1)",
  episodeType: "standard",
  stillPath: "/wrkaANaenatc4Ege4CXZAfY9vUN.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
