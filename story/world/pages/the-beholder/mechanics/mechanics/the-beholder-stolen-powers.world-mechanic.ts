import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const theBeholderStolenPowers = {
  id: "01a0deed-6022-7dcd-ae2b-efcf91b019c4",
  type: "page-type/world-mechanic",
  slug: "the-beholder-stolen-powers",
  title: "Stolen Powers",
  world: "world/the-beholder",
  description:
    "The Onset surfaced a few years ago, and most people never awaken: they have attributes and nothing more. Only the Awakened carry a power, so a power can be stolen only from someone who has one, while attributes can be stolen from anyone. A stolen power enters at 10% of the victim's mastery and grows only by stealing more of the same power, adding 10% of each later owner's mastery. It has no ranks and is not honed by use. Will multiplies its output on top, and there is no ceiling on how many powers she holds. Powers are rare, and most victims yield attributes only.",
} as const satisfies WorldMechanic
