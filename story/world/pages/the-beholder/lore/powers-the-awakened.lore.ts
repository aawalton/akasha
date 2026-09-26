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
    "The Onset surfaced only a few years ago.",
    "Most people never awaken.",
    "The overwhelming majority of people carry no power at all.",
    "The System registers six attributes on everyone: Might, Vitality, Celerity, Acuity, Will, Allure.",
    "A minority, the awakened, carry a single Onset power layered on top of their attributes.",
    "The rarity of powers shapes how Pearl hunts.",
    "Attribute-theft works on anyone, since everyone has attributes.",
    "A +10% attribute slice can be carved off any victim, powered or not.",
    "Power-theft requires an awakened victim; a power can only be stolen from someone who has one.",
    "Early in her career Pearl's victims are unpowered humans, beautiful and gifted.",
    "Every theft Pearl banks early in her career is an attribute slice.",
    "Colette Vane and Dove were unpowered victims from whom Pearl took attribute slices.",
    "When Pearl kills an awakened victim, a power becomes available to take.",
    "A power Pearl takes would have its output scale with her Will.",
  ],
} as const satisfies Lore
