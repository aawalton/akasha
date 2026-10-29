import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS03e09 = {
  id: "01a18885-00fa-7f0f-b08e-b391a058a818",
  type: "page-type/episode",
  slug: "studio-c-s03e09",
  description:
    "Whitney learns how Mallory rates their friendship, and a family meets their son's new girlfriend.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-3"],
  position: 9,
  publishedAt: "2013-12-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5580147",
      externalLink: "https://www.themoviedb.org/tv/68207/season/3/episode/9",
    },
  ],
  title: "Season 3 Episode 9",
  episodeType: "standard",
  stillPath: "/ct6QBTmF1kP9eei1v3W4DsTb1dd.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
