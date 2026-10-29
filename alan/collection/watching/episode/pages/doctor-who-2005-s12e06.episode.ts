import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const doctorWho2005S12e06 = {
  id: "01a18847-cd34-7df1-a15e-7dae70f13673",
  type: "page-type/episode",
  slug: "doctor-who-2005-s12e06",
  description:
    'The mysterious "Praxeus" will cause the quartet to split up (never a good idea) to investigate mysteries all over Earth. And what they find will threaten all human life (again).',
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/doctor-who-season-12"],
  position: 6,
  publishedAt: "2020-02-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2044562",
      externalLink: "https://www.themoviedb.org/tv/57243/season/12/episode/6",
    },
  ],
  title: "Praxeus",
  episodeType: "standard",
  stillPath: "/bLaBhnAvTykOlkmoukF36vg9fk4.jpg",
  voteAverage: 5.5,
  createdAt: "2026-10-29T15:29:29.394Z",
  updatedAt: "2026-10-29T15:29:29.394Z",
} as const satisfies Episode
