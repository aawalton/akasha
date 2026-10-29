import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDeepSpaceNineS05e05 = {
  id: "01a18852-7715-7d39-ace3-2d2ad1a68aef",
  type: "page-type/episode",
  slug: "star-trek-deep-space-nine-s05e05",
  description:
    "Stardate: Unknown. An alien entity has possessed Keiko's body and is holding it hostage until O'Brien completes an assignment for it.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-deep-space-nine-season-5"],
  position: 5,
  publishedAt: "1996-10-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005806",
      externalLink: "https://www.themoviedb.org/tv/580/season/5/episode/5",
    },
  ],
  title: "The Assignment",
  episodeType: "standard",
  stillPath: "/3vvZAmtKjjdy5CVklXnWdQQ1HAV.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:41:08.240Z",
  updatedAt: "2026-10-29T15:41:08.240Z",
} as const satisfies Episode
