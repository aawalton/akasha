import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS03e03 = {
  id: "01a183d4-acc4-7d17-886e-64bbd03f4673",
  type: "page-type/episode",
  slug: "my-hero-academia-s03e03",
  description:
    "Izuku tries to talk with Kota as the first-years start their training in earnest. Little do they know what awaits them in the forest.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-3"],
  position: 3,
  publishedAt: "2018-04-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1448436",
      externalLink: "https://www.themoviedb.org/tv/65930/season/3/episode/3",
    },
  ],
  title: "Kota",
  episodeType: "standard",
  stillPath: "/A4fGP3dSlUXqs0grDPCilYgkTYi.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
