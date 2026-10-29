import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDeepSpaceNineS02e26 = {
  id: "01a18852-7712-7401-be95-9c02fea27232",
  type: "page-type/episode",
  slug: "star-trek-deep-space-nine-s02e26",
  description:
    "Stardate: Unknown. Sisko and Quark and a strange telepathic woman are arrested by Jem'Hadar, soldiers of the Dominion.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-deep-space-nine-season-2"],
  position: 26,
  publishedAt: "1994-06-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005750",
      externalLink: "https://www.themoviedb.org/tv/580/season/2/episode/26",
    },
  ],
  title: "The Jem'Hadar",
  episodeType: "finale",
  stillPath: "/hvjyUWtNpeCMxNx4NdbUgiDbvNG.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:41:08.240Z",
  updatedAt: "2026-10-29T15:41:08.240Z",
} as const satisfies Episode
