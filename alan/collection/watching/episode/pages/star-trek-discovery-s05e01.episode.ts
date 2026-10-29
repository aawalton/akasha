import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS05e01 = {
  id: "01a18852-a9f8-7dc4-8af9-25502d6a4845",
  type: "page-type/episode",
  slug: "star-trek-discovery-s05e01",
  description:
    "Captain Burnham and the U.S.S. Discovery are sent to retrieve a mysterious 800-year-old Romulan vessel; until the artifact hidden inside is stolen, leading to an epic chase. Meanwhile, Saru is offered the position of a lifetime, and Tilly's efforts to help pull her into a tangled web of secrecy.",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-5"],
  position: 1,
  publishedAt: "2024-04-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4596046",
      externalLink: "https://www.themoviedb.org/tv/67198/season/5/episode/1",
    },
  ],
  title: "Red Directive",
  episodeType: "standard",
  stillPath: "/z7kLGr1712Dn2R0upkwom8uwOiI.jpg",
  voteAverage: 4.9,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
