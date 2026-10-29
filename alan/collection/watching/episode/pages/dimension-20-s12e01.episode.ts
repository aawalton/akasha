import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const dimension20S12e01 = {
  id: "01a18846-478d-7eae-9e38-ea6ec91d834c",
  type: "page-type/episode",
  slug: "dimension-20-s12e01",
  description:
    "Terry, Megan, Tuti, and Seven embark upon their senior year Shriek Week at Bram University.",
  ownLength: 111,
  ownProgress: 0,
  partOfCollections: ["season/shriek-week"],
  position: 1,
  publishedAt: "2021-11-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3349407",
      externalLink: "https://www.themoviedb.org/tv/89180/season/12/episode/1",
    },
  ],
  title: "The Club Fair",
  episodeType: "standard",
  stillPath: "/V1fMLviBrfPEFEtCGYybvtbO7c.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:27:49.638Z",
  updatedAt: "2026-10-29T15:27:49.638Z",
} as const satisfies Episode
