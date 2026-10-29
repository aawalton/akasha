import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS04e04 = {
  id: "01a18885-00fa-78e2-ab51-f2485af77db8",
  type: "page-type/episode",
  slug: "studio-c-s04e04",
  description:
    "Celine Dion introduces her daughter Lexi to the world, the world fencing championships reveal the greatest slow-motion replay to date, and Adam tries to ditch his annoying wingman at the club.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-4"],
  position: 4,
  publishedAt: "2014-04-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3721787",
      externalLink: "https://www.themoviedb.org/tv/68207/season/4/episode/4",
    },
  ],
  title: "Season 4 Episode 4",
  episodeType: "standard",
  stillPath: "/90g9QB5yP6DfZFhhEkpkCmIHQHc.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
