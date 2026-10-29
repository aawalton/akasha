import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e25 = {
  id: "01a18853-ac90-748e-9a37-94a10ba714a4",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e25",
  description:
    "Stardate: Unknown. Voyager encounters another Federation starship, the USS Equinox, in the Delta Quadrant. But as an alien presence prepares an attack, Janeway begins to uncover the Equinox's sinister secret.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 25,
  publishedAt: "1999-05-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113288",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/25",
    },
  ],
  title: "Equinox (1)",
  episodeType: "finale",
  stillPath: "/jiVLCib0QcISWUFymvAQtxvz7EW.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
