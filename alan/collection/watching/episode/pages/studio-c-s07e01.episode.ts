import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS07e01 = {
  id: "01a18885-00fc-70b1-9d31-a326011ff3df",
  type: "page-type/episode",
  slug: "studio-c-s07e01",
  description:
    "Studio C Season 7 starts out with a BANG! Matt discovers who Jeremy really is, Gary decides he's had enough and quits the band, and Shay Carl presents the ins and outs of vlogging etiquette.",
  ownLength: 26,
  ownProgress: 26,
  partOfCollections: ["season/studio-c-season-7"],
  position: 1,
  publishedAt: "2016-10-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2855464",
      externalLink: "https://www.themoviedb.org/tv/68207/season/7/episode/1",
    },
  ],
  title: "Season 7 Episode 1",
  episodeType: "standard",
  stillPath: "/3dl4vIN8eXykegSEerw0SyBFrnw.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
