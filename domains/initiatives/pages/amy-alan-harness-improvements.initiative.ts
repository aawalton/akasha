import type { Initiative } from "../initiative.page-type.ts"

export const amyAlanHarnessImprovements = {
  id: "01a07679-5492-7992-ab84-cc889f134678",
  pageTypeSlug: "initiative",
  slug: "amy-alan-harness-improvements",
  domainSlug: "domain/alan-harness",
  personaSlug: "amy",
  intents: [
    {
      statement: "A calculation reaches the pages naming its page through a relation.",
      workingMemory:
        "`Reach` gains `naming(propertySlug)`, answering every page naming this one under that property, each worked. Backed by `idsNaming`, one listing of `.git/data/index/relation/page/id/<id>/<property>/`. Proven present: 13 set-logs under `session-slug` for the 2026-08-10 session, 16 under `exercise-slug` for one movement. `Source.subjectAt` must also fall back to the index, since `computedInto` builds its subjects from the query's own rows alone. The cycle guard in `computingOver` already covers both.",
    },
    {
      statement: "A day's strength volume is computed from its sessions rather than written.",
      workingMemory:
        'Three calculations, one hop each: `set-log.setVolume` reaching `exerciseSlug` for the load model and the person for bodyweight; `workout-session.sessionVolume` summing over `naming("session-slug")`; `wake-day.strengthVolume` summing over a new session-to-day relation. Then `set-volume`, `session-volume`, `strength-points` and `strength-volume-service` go, `track workout show` and `finish` read the value rather than counting it, 81 stored `strengthVolume` values are stripped, and `page-key-computed` gets the call site it never had.',
    },
    {
      statement: "The Strength stoplight shows a figure taken from data that arrives every day.",
      workingMemory:
        "The road in works end to end: `akasha track workout start`, then `set`, then `finish`, proven by a session opened, logged against, closed and taken away again. `composedFor` wrote neither `pageTypeSlug` nor `slug` until today, so every session a command opened landed unfiled. What is left is the logging itself: no session since 2026-08-10, so every day counts 0.",
    },
  ],
} as const satisfies Initiative
