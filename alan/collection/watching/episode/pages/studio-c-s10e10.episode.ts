import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS10e10 = {
  id: "01a18885-0100-76bd-993c-9fa791e8e85d",
  type: "page-type/episode",
  slug: "studio-c-s10e10",
  description:
    "A not so motivational speaker visits an elementary school. Communication breaks down at a college apartment when one roommate has strange meanings for common acronyms. And Hansel and Gretel question the witch's cooking abilities and home life.",
  ownLength: 26,
  ownProgress: 26,
  partOfCollections: ["season/studio-c-season-10"],
  position: 10,
  publishedAt: "2019-12-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2033024",
      externalLink: "https://www.themoviedb.org/tv/68207/season/10/episode/10",
    },
  ],
  title: "Season 10 Episode 10",
  episodeType: "standard",
  stillPath: "/4lUIVcad1o7ccWyVnnYR0DRcAH6.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
