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
    "The gamification already built is mid-migration and parts of it will be rebuilt from first principles.",
  ],
} as const satisfies Initiative
