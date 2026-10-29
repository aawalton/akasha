import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const doctorWho2005S03e06 = {
  id: "01a18883-f214-77a0-9105-111555903ddd",
  type: "page-type/episode",
  slug: "doctor-who-2005-s03e06",
  description:
    "Martha has to save her family from the lunatic schemes of the monstrous Professor Lazarus.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/doctor-who-season-3"],
  position: 6,
  publishedAt: "2007-05-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "941496",
      externalLink: "https://www.themoviedb.org/tv/57243/season/3/episode/6",
    },
  ],
  title: "The Lazarus Experiment",
  episodeType: "standard",
  stillPath: "/wlxx4LJqwOs5H4Vb14Ixrog7u9l.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T16:35:10.995Z",
  updatedAt: "2026-10-29T16:35:10.995Z",
} as const satisfies Episode
