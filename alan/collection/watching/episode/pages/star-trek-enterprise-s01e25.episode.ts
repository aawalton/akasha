import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS01e25 = {
  id: "01a18852-d430-7e09-8b22-711a5027589d",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s01e25",
  description:
    "Archer, Hoshi, Travis, Malcolm and Trip have decidedly different experiences during shore leave on Risa. Meanwhile, on Enterprise, Phlox enters his annual hibernation cycle.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-1"],
  position: 25,
  publishedAt: "2002-05-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15560",
      externalLink: "https://www.themoviedb.org/tv/314/season/1/episode/25",
    },
  ],
  title: "Two Days and Two Nights",
  episodeType: "standard",
  stillPath: "/brECUMLHblfAdIuYJ4LmOx49cXh.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
