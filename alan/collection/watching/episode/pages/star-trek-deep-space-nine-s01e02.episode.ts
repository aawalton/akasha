import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDeepSpaceNineS01e02 = {
  id: "01a18852-7710-7ecb-9aaf-b623ab00e1ae",
  type: "page-type/episode",
  slug: "star-trek-deep-space-nine-s01e02",
  description:
    "Stardate: Unknown.  Kira finds her loyalties divided when a Bajoran extremist wanted by the Cardassians comes to the station with questionable intentions.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-deep-space-nine-season-1"],
  position: 2,
  publishedAt: "1993-01-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005707",
      externalLink: "https://www.themoviedb.org/tv/580/season/1/episode/2",
    },
  ],
  title: "Past Prologue",
  episodeType: "standard",
  stillPath: "/sA5UPqDByqxbgXNBtTmMPQnGk1X.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:41:08.240Z",
  updatedAt: "2026-10-29T15:41:08.240Z",
} as const satisfies Episode
