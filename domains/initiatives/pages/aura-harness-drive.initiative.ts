import type { Initiative } from "../initiative.page-type.ts"

export const auraHarnessDrive = {
  id: "01a0675d-9d5f-79ba-aefb-404d5c9502eb",
  pageTypeSlug: "initiative",
  slug: "aura-harness-drive",
  domainSlug: "domain/game-design",
  personaSlug: "aura",
  intents: [
    {
      statement: "Every attribute carries its total points and the level those points reach.",
      workingMemory:
        "The attribute page type carries pointUnit, pointsToday and pointsTotal, and level is one computed property over pointsTotal holding the rungs 10, 20, 40, 70, 120, 200, 330, 540. lifetimePoints and attributes-levelling are gone, and `akasha measure attributes` takes levelOf from the level property. Nothing writes pointsToday or pointsTotal yet, so a stored level reads 0; attributes-totalling adds the days up from 2026-09-06 afresh on every call and keeps nothing.",
    },
  ],
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
