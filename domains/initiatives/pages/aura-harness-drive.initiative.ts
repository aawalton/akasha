import type { Initiative } from "../initiative.page-type.ts"

export const auraHarnessDrive = {
  id: "01a0675d-9d5f-79ba-aefb-404d5c9502eb",
  pageTypeSlug: "initiative",
  slug: "aura-harness-drive",
  domain: "domain/game-design",
  persona: "aura",
  constraints: [
    "Alan has total aphantasia, which means he has zero experiential memory or imagination. If it isn't in his immediate experience or conceptual map, it doesn't exist.",
    "Alan can store a fact about an experience only by memorizing it; he cannot simply remember one. Showing him something once does not make it known.",
    "Anticipated reward does not move Alan. Progress toward a milestone does, and so does awareness of a milestone not currently met.",
    "Alan is AuDHD and is recovering from severe autistic burnout, so executive function is a major bottleneck. Recovery is expected to run into 2030.",
    "Alan's harness carries his memory and his executive function; the game of it is how it works rather than what it is for.",
    "The gamification already built is mid-migration and parts of it will be rebuilt from first principles.",
    "Attribute points are counted forward from the day an attribute begins, and no earlier day is backfilled.",
  ],
} as const satisfies Initiative
