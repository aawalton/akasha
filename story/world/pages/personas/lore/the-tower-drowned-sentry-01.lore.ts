import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerDrownedSentry01 = {
  id: "01a0d44e-2c3f-7d27-a94e-74ab6a224b16",
  type: "page-type/lore",
  slug: "the-tower-drowned-sentry-01",
  title: "The Drowned Sentry",
  world: "world/personas",
  about: "character-other/the-tower-drowned-sentry-01",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "The Drowned Sentry is a corpse centuries waterlogged in plate rusted fused at every joint.",
    "The Drowned Sentry's fused plate leaves it too slow to turn in time.",
    "The Drowned Sentry's plate turns most of a blow struck at its front.",
    "The Drowned Sentry takes a blow clean at its back or behind its knee or neck.",
    "The Drowned Sentry is dry rot under the rust, and fire is its bane.",
    "Set alight, the Drowned Sentry's seized joints crack and it flails.",
    "Cold water does nothing to the Drowned Sentry.",
    "The Drowned Sentry wakes at a step onto its platform or a strike from the walkway.",
  ],
} as const satisfies Lore
