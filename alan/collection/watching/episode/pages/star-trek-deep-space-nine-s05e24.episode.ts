import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDeepSpaceNineS05e24 = {
  id: "01a18852-7716-7609-a33c-493fadf668e9",
  type: "page-type/episode",
  slug: "star-trek-deep-space-nine-s05e24",
  description:
    'Stardate: Unknown. While salvaging components from DS9\'s sister station, the crew run afoul of a "surprise" left behind by the Cardassians.',
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-deep-space-nine-season-5"],
  position: 24,
  publishedAt: "1997-05-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005825",
      externalLink: "https://www.themoviedb.org/tv/580/season/5/episode/24",
    },
  ],
  title: "Empok Nor",
  episodeType: "standard",
  stillPath: "/3GCTPqHfq2aH1HrMdsmw0hsp9KH.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:41:08.240Z",
  updatedAt: "2026-10-29T15:41:08.240Z",
} as const satisfies Episode
