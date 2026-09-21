import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman22020thAnniversary = {
  id: "01a0676a-d714-701c-869b-87ab384cfed8",
  type: "page-type/release",
  slug: "celtic-woman-2-20-20th-anniversary",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2024-01-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3uAqoycvjKO32NMWswWJes",
      externalLink: "https://open.spotify.com/album/3uAqoycvjKO32NMWswWJes",
    },
  ],
  title: "20 (20th Anniversary)",
} as const satisfies Release
