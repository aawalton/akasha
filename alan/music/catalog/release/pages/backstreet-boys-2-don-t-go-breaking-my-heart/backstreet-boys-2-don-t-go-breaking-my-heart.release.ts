import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const backstreetBoys2DonTGoBreakingMyHeart = {
  id: "01a0676a-d71c-701f-89e0-2c8f703b5c87",
  type: "release",
  slug: "backstreet-boys-2-don-t-go-breaking-my-heart",
  title: "Don't Go Breaking My Heart",
  partOfCollections: ["artist/backstreet-boys"],
  position: 0,
  ownLength: 3.5954,
  ownProgress: 3.5954,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-05-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7vM2i8qUZILFrg03mu3pva",
      externalLink: "https://open.spotify.com/album/7vM2i8qUZILFrg03mu3pva",
    },
  ],
} as const satisfies Release
