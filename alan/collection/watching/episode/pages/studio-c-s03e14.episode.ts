import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS03e14 = {
  id: "01a18885-00fa-73b7-a7bc-fe9a84f06d83",
  type: "page-type/episode",
  slug: "studio-c-s03e14",
  description:
    "The best of Studio C's sketches over the last 3 seasons will leave you laughing all night long!",
  ownLength: 28,
  ownProgress: 28,
  partOfCollections: ["season/studio-c-season-3"],
  position: 14,
  publishedAt: "2013-10-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5580192",
      externalLink: "https://www.themoviedb.org/tv/68207/season/3/episode/14",
    },
  ],
  title: "The Best of Studio C",
  episodeType: "standard",
  stillPath: "/fIekYhI1WmfyUinCMqZWP0AEcJR.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
