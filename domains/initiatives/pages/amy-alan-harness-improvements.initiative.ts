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
        "The road in works end to end: `akasha track workout start`, then `set`, then `finish`, proven by a session opened, logged against, closed and taken away again. `composedFor` wrote neither `pageTypeSlug` nor `slug` until today, so every session a command opened landed unfiled. What is left is the logging itself: no session since 2026-08-10, so every day counts 0.",
    },
  ],
} as const satisfies Initiative
