import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDeepSpaceNineS04e02 = {
  id: "01a18852-7714-7f37-abe7-6ecf09bb3015",
  type: "page-type/episode",
  slug: "star-trek-deep-space-nine-s04e02",
  description:
    "Stardate: Unknown. Melanie, an aspiring writer, wants to know why Jake Sisko stopped writing at 40. Jake tells how his father died in an accident and then suddenly reappeared.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-deep-space-nine-season-4"],
  position: 2,
  publishedAt: "1995-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005778",
      externalLink: "https://www.themoviedb.org/tv/580/season/4/episode/2",
    },
  ],
  title: "The Visitor",
  episodeType: "standard",
  stillPath: "/saeqepG7p851FnXTgoe9bgzqxps.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:41:08.240Z",
  updatedAt: "2026-10-29T15:41:08.240Z",
} as const satisfies Episode
