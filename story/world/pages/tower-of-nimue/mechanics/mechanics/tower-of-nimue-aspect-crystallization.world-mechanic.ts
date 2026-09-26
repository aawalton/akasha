import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const towerOfNimueAspectCrystallization = {
  id: "01a0deeb-597d-718e-a0d6-cb4918d6d205",
  type: "page-type/world-mechanic",
  slug: "tower-of-nimue-aspect-crystallization",
  title: "Aspect Crystallization",
  world: "world/tower-of-nimue",
  description:
    "An Aspect is a soft class or title that crystallizes out of a climber's essence mix. At each Gatekeeper, at floors 10, 25, 50 and 75, the climber chooses an Aspect from 2 or 3 options drawn from the essences they actually hold; each option amplifies a theme and unlocks an apex ability. The first crystallization is at floor 10, and a climber holds no Aspect before it.",
} as const satisfies WorldMechanic
