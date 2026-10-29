import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const doctorWho2005S05e01 = {
  id: "01a18883-f216-764a-a005-e635548d29ab",
  type: "page-type/episode",
  slug: "doctor-who-2005-s05e01",
  description:
    "The Doctor has regenerated into a brand new man, but danger strikes before he can even recover. With the TARDIS wrecked, and the sonic screwdriver destroyed, the new Doctor has just 20 minutes to save the whole world - and only Amy Pond to help him.",
  ownLength: 65,
  ownProgress: 65,
  partOfCollections: ["season/doctor-who-season-5"],
  position: 1,
  publishedAt: "2010-04-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "941518",
      externalLink: "https://www.themoviedb.org/tv/57243/season/5/episode/1",
    },
  ],
  title: "The Eleventh Hour",
  episodeType: "standard",
  stillPath: "/i10v5tkFxq7z6HNVLCHZSctM1hk.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T16:35:10.995Z",
  updatedAt: "2026-10-29T16:35:10.995Z",
} as const satisfies Episode
