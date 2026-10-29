import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDeepSpaceNineS02e01 = {
  id: "01a18852-7711-76ac-a69d-ab5043f06e8b",
  type: "page-type/episode",
  slug: "star-trek-deep-space-nine-s02e01",
  description:
    'Stardate: Unknown. Word that a previously thought dead Bajoran resistance legend is still alive sends Kira and Chief O\'Brien to Cardassia IV to rescue him; meanwhile "The Circle", a sect of the Bajoran provisional government that is intent on wiping out alien influence, is sneaking into power.',
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-deep-space-nine-season-2"],
  position: 1,
  publishedAt: "1993-09-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005725",
      externalLink: "https://www.themoviedb.org/tv/580/season/2/episode/1",
    },
  ],
  title: "The Homecoming (1)",
  episodeType: "standard",
  stillPath: "/fwA8XIVSCvtPR5BqU6BE9JSrB0n.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:41:08.240Z",
  updatedAt: "2026-10-29T15:41:08.240Z",
} as const satisfies Episode
