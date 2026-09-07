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
        "Chou's eight drives are pages under game-design, each carrying his number, name and definition beside ours. The harness is a memory prosthetic and an executive function support before it is a game, and its win condition is going quiet so Alan leaves. Warm colours and black mean a goal unmet; green and blue are both wins. Recovery is a chain of integrals, stress level to surplus to safety to life satisfaction, each on a longer cadence than the last.",
    },
    {
      statement: "Both stoplight sets draw as widgets in Alan's native app.",
      workingMemory:
        "The widget, its feed at /api/attribute-stoplights, the readout-widget page and the bundle entry naming AttributeStoplightsWidget are all on origin/main. The akasha migration closed on 2026-09-04 and its bar on pushing went with it; `akasha push` is the route, and `git push` stays refused for a reason the hook now states on its own. What is left is a build and an upload, and whether the tile reaches Alan's phone is unverified.",
    },
    {
      statement: "Every attribute carries its lifetime points and the level those points reach.",
      workingMemory:
        "lifetimePoints is declared on all seven pages, reads 0, and is written by nothing. attributes-totalling sums wake-days from ATTRIBUTES_COUNTED_FROM 2026-09-06 afresh on every call and keeps nothing, under its own invariant `No total is kept beside a readout`, which contradicts this intent and is Alan's call to settle. attributes-levelling yields the rungs 10, 20, 40, 70, 120, 200, 330, 540, and only `akasha measure attributes` shows a level.",
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
