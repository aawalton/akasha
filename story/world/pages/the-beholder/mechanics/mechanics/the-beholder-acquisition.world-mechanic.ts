import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const theBeholderAcquisition = {
  id: "01a0deed-6020-7d6b-9cb9-d139e7459ae6",
  type: "page-type/world-mechanic",
  slug: "the-beholder-acquisition",
  title: "Acquisition",
  world: "world/the-beholder",
  description:
    "Acquisition is Pearl's Onset power, and it cannot be stolen. It grants no power of its own: it lets her permanently take from anyone she kills, and she keeps only what she takes. Theft is her sole axis of growth, with no levels, no skills, no meta-meter and no tax; nothing levels with use, and every point on her sheet is something she took off a corpse. She takes one steal per victim, choosing one of the victim's top three notable traits, and with several victims she chooses once per victim. Every steal takes 10% of the victim's value, permanently and stacking, and it is flat-additive: 10% of the victim's value, not of Pearl's own. A steal is either an attribute, taken from anyone, or a power, an Onset ability at 10% of the victim's mastery, taken only from an Awakened victim. A stolen attribute or power deepens only by stealing more of the same off the next victim.",
} as const satisfies WorldMechanic
