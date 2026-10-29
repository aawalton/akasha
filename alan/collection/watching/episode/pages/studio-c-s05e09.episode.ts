import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS05e09 = {
  id: "01a18885-00fb-7af1-a865-68a7bd840ea1",
  type: "page-type/episode",
  slug: "studio-c-s05e09",
  description:
    "The local cop precinct gets sensitivity training, and the school janitor helps a studying couple with their chemistry.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-5"],
  position: 9,
  publishedAt: "2014-12-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5574675",
      externalLink: "https://www.themoviedb.org/tv/68207/season/5/episode/9",
    },
  ],
  title: "Season 5 Episode 9",
  episodeType: "standard",
  stillPath: "/jRtRqL5A9pz19Lgp9u5Uz42xtQz.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
