import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e07 = {
  id: "01a1884b-ef75-7ef5-97bd-7332c8a90ad2",
  type: "page-type/episode",
  slug: "ncis-s14e07",
  description:
    "Torres boldly breaks protocol when he learns a witness in an NCIS case is wanted by U.S. Immigration and Customs Enforcement.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 7,
  publishedAt: "2016-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1236294",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/7",
    },
  ],
  title: "Home of the Brave",
  episodeType: "standard",
  stillPath: "/ztqEgEHHQCv1zS6zj7nqjJ9M83g.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
