import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const breathOfTheWildSpiritOrb = {
  id: "01a10331-b561-7135-84de-7ea2c41c2744",
  type: "page-type/world-currency",
  slug: "breath-of-the-wild-spirit-orb",
  title: "Spirit Orb",
  world: "world/hyrule",
  description:
    "A small warm sphere of light a shrine's monk becomes, carried in the Sheikah Slate.",
  createdAt: "2026-10-03T19:15:51.777Z",
  updatedAt: "2026-10-03T19:15:54.000Z",
} as const satisfies WorldCurrency
