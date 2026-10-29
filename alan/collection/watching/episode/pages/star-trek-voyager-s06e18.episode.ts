import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e18 = {
  id: "01a18853-ac91-7823-8f45-e37d05481f87",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e18",
  description:
    "Stardate: Unknown. Ensign Lindsay Ballard returns to Voyager after being killed during a previous away mission. An alien race known as the Kobali, whose only method of reproduction is 'resurrection' of the dead through genetic engineering had revived her and taken her as a new member of their race. When the full extent of her new Kobali genes are activated, they reach a point where she must choose between her old home on the ship, or her new home with her adoptive Kobali family.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 18,
  publishedAt: "2000-03-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113352",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/18",
    },
  ],
  title: "Ashes to Ashes",
  episodeType: "standard",
  stillPath: "/6X0tIWxbUbE08mftBVGDfcxjywS.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
