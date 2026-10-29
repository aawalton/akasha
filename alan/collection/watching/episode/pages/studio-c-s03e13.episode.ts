import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS03e13 = {
  id: "01a18885-00fa-7c2b-aaf6-10a9bd3eeb25",
  type: "page-type/episode",
  slug: "studio-c-s03e13",
  description:
    "Listen in on personal insights from the Studio C cast as they reveal their Top 10 sketches.",
  ownLength: 58,
  ownProgress: 58,
  partOfCollections: ["season/studio-c-season-3"],
  position: 13,
  publishedAt: "2013-11-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5580183",
      externalLink: "https://www.themoviedb.org/tv/68207/season/3/episode/13",
    },
  ],
  title: "Cast Favorites",
  episodeType: "standard",
  stillPath: "/hsvJJ7z6WvuFM9xHcAgm9VT0Ity.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
