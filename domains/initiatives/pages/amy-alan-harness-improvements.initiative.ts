import type { Initiative } from "../initiative.page-type.ts"

export const amyAlanHarnessImprovements = {
  id: "01a07679-5492-7992-ab84-cc889f134678",
  pageTypeSlug: "initiative",
  slug: "amy-alan-harness-improvements",
  domainSlug: "domain/alan-harness",
  personaSlug: "amy",
  intents: [
    {
      statement: "The Strength stoplight shows a figure taken from data that arrives every day.",
      workingMemory:
        "Built and proven. `strength-volume-service` runs the rollup every ten minutes over the four days ending today, and the tile takes a reading rather than drawing empty. `composedFor` wrote neither `pageTypeSlug` nor `slug`, so every session a command opened landed unfiled; that is mended, and proven by a session opened, logged against, closed and taken away again. What is left is the logging itself: no session since 2026-08-10, so every day counts 0. The road in is `akasha track workout start`, then `set`, then `finish`.",
    },
  ],
} as const satisfies Initiative
