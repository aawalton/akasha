import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const powersTheAwakened = {
  id: "01a0ddf8-63fd-7a87-925b-1b6f830e7a56",
  type: "page-type/lore",
  slug: "powers-the-awakened",
  title: "Powers & the Awakened",
  world: "world/the-beholder",
  loreDisclosure: "lore-disclosure/wiki",
  facts: [
    "Powers are rare.",
    "Most people never awaken.",
    "The overwhelming majority of people carry no power at all.",
    "A minority, the awakened, carry a single Onset power layered on top of their attributes.",
    "The System registers the power an awakened person carries.",
    "The rarity of powers shapes how Pearl hunts.",
    "Early in her career Pearl's victims are unpowered humans, beautiful and gifted.",
    "Every theft Pearl banks early in her career is an attribute slice.",
    "Dove was an unpowered victim from whom Pearl took an attribute slice.",
    "When Pearl kills an awakened victim, a power becomes available to take.",
  ],
} as const satisfies Lore
