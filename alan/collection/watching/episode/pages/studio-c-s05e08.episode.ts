import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS05e08 = {
  id: "01a18885-00fb-781f-a66e-185f47098848",
  type: "page-type/episode",
  slug: "studio-c-s05e08",
  description:
    "A high school graduation ceremony gets a little off track, and the search for Rapunzel finally comes to an end.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-5"],
  position: 8,
  publishedAt: "2014-11-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5574671",
      externalLink: "https://www.themoviedb.org/tv/68207/season/5/episode/8",
    },
  ],
  title: "Season 5 Episode 8",
  episodeType: "standard",
  stillPath: "/etsG1ihGk5idlLvXmVoJZXtphOh.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
