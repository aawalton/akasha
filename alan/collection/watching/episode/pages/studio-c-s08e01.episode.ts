import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS08e01 = {
  id: "01a18885-00fd-70b5-bb5e-6bb6a3622a18",
  type: "page-type/episode",
  slug: "studio-c-s08e01",
  description:
    "In this exciting first episode of Season 8, a fight starts when Stephen calls James by the wrong name, we meet a British stage actor playing Jeremy, and a crosswalk desperately wants some company.",
  ownLength: 23,
  ownProgress: 23,
  partOfCollections: ["season/studio-c-season-8"],
  position: 1,
  publishedAt: "2017-10-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1374032",
      externalLink: "https://www.themoviedb.org/tv/68207/season/8/episode/1",
    },
  ],
  title: "Season 8 Episode 1",
  episodeType: "standard",
  stillPath: "/qoEU6AMi3pqOBP4N0dYNHJ799NG.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
