import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS03e07 = {
  id: "01a18885-00fa-79f2-8bf8-6f166c306c0a",
  type: "page-type/episode",
  slug: "studio-c-s03e07",
  description:
    "Mr. Eckelstone subs in the local Lamaze class, and a talk show host tries to keep it together before the commercial break.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/studio-c-season-3"],
  position: 7,
  publishedAt: "2013-11-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5580143",
      externalLink: "https://www.themoviedb.org/tv/68207/season/3/episode/7",
    },
  ],
  title: "Season 3 Episode 7",
  episodeType: "standard",
  stillPath: "/qQ9aeuHqh0V436UunpQZprm2oeA.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
