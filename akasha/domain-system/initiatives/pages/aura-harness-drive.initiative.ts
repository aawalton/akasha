import type { Initiative } from "../initiative.page-type.ts"

export const auraHarnessDrive = {
  id: "01a0675d-9d5f-79ba-aefb-404d5c9502eb",
  pageTypeSlug: "initiative",
  slug: "aura-harness-drive",
  domainSlug: "domain/game-design",
  personaSlug: "aura",
  intents: [
    {
      statement: "Alan's harness drives the behavior he wants to drive.",
      workingMemory:
        "The eight drives of Chou's Octalysis carry his number, name and definition beside ours. Audited against them, the live harness runs on progress almost alone, with collection and connection thin and meaning, creativity, scarcity, novelty and loss missing. Loss is missing on purpose: totals ratchet forward-only, no streaks, and Alan keeps urgency out. The cost is that nothing makes him act today rather than Thursday.",
    },
  ],
  constraints: [
    "Alan has total aphantasia, which means he has zero experiential memory or imagination. If it isn't in his immediate experience or conceptual map, it doesn't exist.",
    "Alan can store a fact about an experience only by memorizing it; he cannot simply remember one. Showing him something once does not make it known.",
    "Anticipated reward does not move Alan. Progress toward a milestone does, and so does awareness of a milestone not currently met.",
    "Alan is AuDHD and is recovering from severe autistic burnout, so executive function is a major bottleneck. Recovery is expected to run into 2030.",
    "Alan's harness carries his memory and his executive function; the game of it is how it works rather than what it is for.",
    "The gamification already built is mid-migration and parts of it will be rebuilt from first principles.",
  ],
} as const satisfies Initiative
